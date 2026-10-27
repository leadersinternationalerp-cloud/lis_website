<?php
/**
 * Leaders International School — cPanel Form Handler (/api/submit.php)
 * Handles online admissions applications (/apply) and contact enquiries (/contact)
 * on standard cPanel shared hosting (Apache / LiteSpeed + PHP).
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'ok' => true,
        'endpoint' => '/api/submit.php',
        'runtime' => 'cpanel-php',
        'accepts' => ['application', 'enquiry'],
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Could not read the form data.']);
    exit;
}

$kind = (isset($payload['kind']) && $payload['kind'] === 'application') ? 'application' : 'enquiry';
$email = isset($payload['email']) ? trim((string)$payload['email']) : '';

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Please give us an email address we can reply to.']);
    exit;
}

$required = ($kind === 'application')
    ? ['firstName', 'lastName', 'parentName', 'phone']
    : ['name', 'message'];

$missing = [];
foreach ($required as $field) {
    if (!isset($payload[$field]) || trim((string)$payload[$field]) === '') {
        $missing[] = $field;
    }
}
if (!empty($missing)) {
    http_response_code(422);
    echo json_encode(['error' => 'Please complete: ' . implode(', ', $missing) . '.']);
    exit;
}

$year = date('Y');
$rand = strtoupper(substr(bin2hex(random_bytes(3)), 0, 4));
$reference = "LIS-{$year}-{$rand}";

$to = 'info@leaderinternationalschool.ac.tz';
$subject = ($kind === 'application' ? 'Application' : 'Website enquiry') . " — {$reference}";

$lines = [];
foreach ($payload as $k => $v) {
    if ($v === '' || $v === null || is_array($v)) continue;
    $label = ucfirst(preg_replace('/([A-Z])/', ' $1', (string)$k));
    $val = is_bool($v) ? ($v ? 'Yes' : 'No') : (string)$v;
    $lines[] = "{$label}: {$val}";
}

$body = implode("\n", array_merge(
    [
        "Reference: {$reference}",
        "School: Leaders International School — Kisakasaka, Zanzibar",
        "Submitted: " . gmdate('Y-m-d H:i:s') . " UTC",
        "",
    ],
    $lines,
    [
        "",
        "Sent from the LIS website.",
    ]
));

$mailto = 'mailto:' . rawurlencode($to)
    . '?subject=' . rawurlencode($subject)
    . '&body=' . rawurlencode($body);

// Save a local backup log in /submissions/outbox.jsonl (protected by .htaccess)
$subDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'submissions';
if (!is_dir($subDir)) {
    @mkdir($subDir, 0755, true);
}
if (is_dir($subDir)) {
    @file_put_contents(
        $subDir . DIRECTORY_SEPARATOR . '.htaccess',
        "Require all denied\nDeny from all\n"
    );
    $record = array_merge(
        ['kind' => $kind, 'reference' => $reference, 'submittedAt' => gmdate('c')],
        $payload
    );
    @file_put_contents(
        $subDir . DIRECTORY_SEPARATOR . 'outbox.jsonl',
        json_encode($record, JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );
}

// Send email via cPanel PHP mail()
$safeReplyTo = str_replace(["\r", "\n"], '', $email);
$headers = [
    'From: Leaders International School Website <no-reply@leaderinternationalschool.ac.tz>',
    "Reply-To: {$safeReplyTo}",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'status' => 'cms',
        'reference' => $reference,
        'mailto' => $mailto,
        'message' => 'Your details have been emailed directly to the school office and we will be in touch.',
    ]);
} else {
    echo json_encode([
        'status' => 'email',
        'reference' => $reference,
        'mailto' => $mailto,
        'message' => 'Saved on the server. Please also click the button below to send via your email app.',
    ]);
}
