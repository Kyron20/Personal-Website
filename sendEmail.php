<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Validate data
    if (empty($name) || empty($email) || empty($message)) {
        // Handle empty fields
        echo "Please fill in all fields.";
        http_response_code(400); // Bad request
        exit;
    }

    // Set recipient email address
    $recipient = "kyron.robinson01@gmail.com"; // Replace with your email address

    // Set email subject
    $subject = "New Message from $name";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Set headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($recipient, $subject, $email_content, $headers)) {
        // Email sent successfully
        echo "Thank you for your message! We will get back to you soon.";
    } else {
        // Failed to send email
        echo "Oops! Something went wrong and we couldn't send your message.";
        http_response_code(500); // Server error
    }
} else {
    // Not a POST request, handle accordingly
    http_response_code(403); // Forbidden
    echo "There was a problem with your submission, please try again.";
}
?>
