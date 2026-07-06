<?php

declare(strict_types=1);

/*
  SlabWay Contact Form Handler
  File: contact.php

  The form works only on a server with PHP.
  For local testing use:
  php -S localhost:8000
*/

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Please check the required fields and try again.', 405);
}

/* ================================
   Basic Settings
   Keep this email synced with assets/js/config.js
================================ */

$recipientEmail = 'hello@slabway.com';
$siteName = 'SlabWay';
$subjectPrefix = 'New SlabWay Concrete Request';

/* ================================
   Helpers
================================ */

function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);

    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);

    exit;
}

function post_value(string $key): string
{
    return isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
}

function clean_text(string $value, int $maxLength = 3000): string
{
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value);
    $value = preg_replace('/\s+/', ' ', $value);
    $value = trim((string) $value);

    if (mb_strlen($value) > $maxLength) {
        $value = mb_substr($value, 0, $maxLength);
    }

    return $value;
}

function clean_message(string $value, int $maxLength = 5000): string
{
    $value = strip_tags($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace("/\n{3,}/", "\n\n", $value);
    $value = trim((string) $value);

    if (mb_strlen($value) > $maxLength) {
        $value = mb_substr($value, 0, $maxLength);
    }

    return $value;
}

function safe_header_value(string $value): string
{
    return str_replace(["\r", "\n"], '', $value);
}

/* ================================
   Anti-spam
================================ */

$honeypot = post_value('companyWebsite');

if ($honeypot !== '') {
    respond(false, 'Please check the required fields and try again.', 400);
}

$requestStartedAt = post_value('requestStartedAt');

if ($requestStartedAt !== '') {
    $startedAtMs = (int) $requestStartedAt;
    $nowMs = (int) round(microtime(true) * 1000);
    $elapsedMs = $nowMs - $startedAtMs;

    if ($startedAtMs <= 0 || $elapsedMs < 1800) {
        respond(false, 'Please check the required fields and try again.', 400);
    }
}

/* ================================
   Collect + sanitize fields
================================ */

$fullName = clean_text(post_value('fullName'), 120);
$email = clean_text(post_value('email'), 180);
$phone = clean_text(post_value('phone'), 80);
$service = clean_text(post_value('service'), 160);
$message = clean_message(post_value('message'), 5000);
$sourcePage = clean_text(post_value('sourcePage'), 180);
$privacyConsent = post_value('privacyConsent');

/* ================================
   Validation
================================ */

if (
    $fullName === '' ||
    $email === '' ||
    $phone === '' ||
    $service === '' ||
    $message === '' ||
    $privacyConsent !== 'yes'
) {
    respond(false, 'Please check the required fields and try again.', 400);
}

if (mb_strlen($fullName) < 2) {
    respond(false, 'Please check the required fields and try again.', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please check the required fields and try again.', 400);
}

if (mb_strlen($phone) < 7) {
    respond(false, 'Please check the required fields and try again.', 400);
}

if (mb_strlen($message) < 12) {
    respond(false, 'Please check the required fields and try again.', 400);
}

/* ================================
   Email body
================================ */

$submittedAt = date('Y-m-d H:i:s');
$userIp = $_SERVER['REMOTE_ADDR'] ?? 'Unavailable';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unavailable';

$emailSubject = safe_header_value($subjectPrefix . ' — ' . $service);

$emailBody = <<<BODY
New concrete request submitted through {$siteName}.

Important platform note:
SlabWay is an independent provider-matching platform. SlabWay does not perform concrete work directly. Participating providers are independent.

Request details:
Full name: {$fullName}
Email: {$email}
Phone: {$phone}
Concrete category: {$service}
Source page: {$sourcePage}
Submitted at: {$submittedAt}
User IP: {$userIp}

Project message:
{$message}

Consent:
The user confirmed privacy consent before submitting.

Technical:
User agent: {$userAgent}
BODY;

$fromEmail = 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'slabway.com');
$fromEmail = safe_header_value($fromEmail);
$replyTo = safe_header_value($email);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $siteName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $fullName . ' <' . $replyTo . '>',
    'X-Mailer: PHP/' . phpversion()
];

/* ================================
   Send
================================ */

$sent = @mail(
    $recipientEmail,
    $emailSubject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$sent) {
    respond(false, 'Please check the required fields and try again.', 500);
}

respond(true, 'Thank you. Your request has been received.');
