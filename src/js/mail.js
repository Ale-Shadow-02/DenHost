document.addEventListener('DOMContentLoaded', () => {

    const ajaxSend = async (formData) => {
        const fetchResp = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        if (!fetchResp.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
        }
        return await fetchResp.text();
    };

    const forms = document.querySelectorAll('form');
    forms.forEach(elem => {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(elem);
            // elem.append('image', formImage.files[0]);
            ajaxSend(formData)
                .then((response) => {
                    console.log(response);
                    alert('Форма успещно отправлена!');
                    elem.reset(); // очищаем поля формы 
                })
                .catch((err) => {
                    console.error(err);
                    alert('Ошибка отправки формы! Попробуйте еще раз!');
                })
        });
    });
    //----------------------------------------------------------
    //Получаем инпут file в переменную
    //const formImage = document.getElementById('formImage');
    //Получаем див для превью в переменную
    //const formPreview = document.getElementById('formPreview');

    //Слушаем изменения в инпуте file
    //formImage.addEventListener('change', () => {
    //uploadFile(formImage.files[0]);
    //});

    //function uploadFile(file) {
    // провераяем тип файла
    //if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    //alert('Разрешены только изображения.');
    //formImage.value = '';
    //return;
    //}
    // проверим размер файла (<2 Мб)
    //if (file.size > 2 * 1024 * 1024) {
    //alert('Файл должен быть менее 2 МБ.');
    //return;
}

//var reader = new FileReader();
//reader.onload = function (e) {
//formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
//};
//reader.onerror = function (e) {
//alert('Ошибка');
//};
//reader.readAsDataURL(file);
//}

});