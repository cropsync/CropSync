<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <link rel="stylesheet" href="style.css"> 
</head>
<body>

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "crop_selector";

    $conn = new mysqli($servername, $username, $password, $dbname);

 
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        $successMessage = "Message sent successfully!";
        // Redirect to contact.html after 3 seconds
        echo '<script>
                setTimeout(function() {
                    window.location.href = "contact.html";
                }, 3000);
              </script>';
    } else {
        $errorMessage = "Error: " . $sql . "<br>" . $conn->error;
    }


    $conn->close();
}
?>

<div id="page-container">
    <div id="content-wrap">
        <section id="contact" class="contact">
            <div class="container" data-aos="fade-up">
                <div class="section-title">
                    <h2>Thank you for contacting us! We will get back to you soon.</h2>

                    <?php if (isset($successMessage)) : ?>
                        <p class="success-message"><?php echo $successMessage; ?></p>
                    <?php elseif (isset($errorMessage)) : ?>
                        <p class="error-message"><?php echo $errorMessage; ?></p>
                    <?php else : ?>
                        <h3 class="section-description">
                            Something went wrong. Please try again later.
                        </h3>
                    <?php endif; ?>

                </div>
            </div>
        </section>
    </div>
</div>

</body>
</html>
