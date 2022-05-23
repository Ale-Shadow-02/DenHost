<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	// use PHPMailer\PHPMailer\SMTP;


	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	// require 'phpmailer/src/SMTP.php';

	// require '../vendor/autoload.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//Настройки SMTP
	// $mail->isSMTP();
	// $mail->SMTPAuth   = true;
	// $mail->Host = 'ssl://smtp.mail.ru';
	// $mail->Port = 465;
	// $mail->Username = 'dvoryadkin66@inbox.ru';
	// $mail->Password = '6Zrx4JzbzNhasRSE46Q8';
	
	//От кого письмо
	$mail->setFrom('dvoryadkin66@inbox.ru', 'Заявка с сайта ...');
	//Кому отправить
	$mail->addAddress('dvoryadkin66@mail.ru');
	$mail->addAddress('dvoryadkiin@yandex.ru');
	$mail->addAddress('avdok.ru@gmail.com');
	//Тема письма
	$mail->Subject = 'Новая заявка с сайта ..."';

	//Рука
	$hand = "Правая";
	if($_POST['hand'] == "left"){
		$hand = "Левая";
	}

	//Тело письма
	$body = '<h1>'.$_POST['subject'].'</h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
	}
	if(trim(!empty($_POST['age']))){
		$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
	}
	
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}
	
	//Прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
		//грузим файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong>';
			$mail->addAttachment($fileAttach);
		}
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>