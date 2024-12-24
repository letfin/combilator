
// Зміна шрифту
$("#font").on("change", function() {
    $("#resultFrame").contents().find("body").css("font-family", $(this).val());
});

// Жирний текст
$("#boldBtn").on("click", function() {
    const frameBody = $("#resultFrame").contents().find("body");
    frameBody.css("font-weight", frameBody.css("font-weight") === "bold" ? "normal" : "bold");
});

// Виконання коду
$("#runBtn").on("click", function() {
    const htmlCode = $("#htmlCode").val();
    const cssCode = `<style>${$("#cssCode").val()}</style>`;
    const jsCode = `<script>${$("#jsCode").val()}<\/script>`;

    const resultFrame = document.getElementById("resultFrame").contentWindow.document;
    resultFrame.open();
    resultFrame.write(htmlCode + cssCode + jsCode);
    resultFrame.close();
});


$('#font').on('change', function(){
    console.log($('#font').val()) 
    $('body').css('font-family',$('#font').val() )
})




$("#setingbutton").on("click", function() {
    $(".panelCont").toggleClass("open");
});


let deg = 0;

$('#setingbutton').click(function(){
 deg -= 360
    $('.rotate360').css('transform', `rotate(${deg}deg)`)
})

function showHtmlBlock() {
    $('.html').css('display', 'flex');
    $('.css').css('display', 'none');  
    $('.js').css('display', 'none');  
    $('#htmlCode').css('height', '450px'); 
    $('#cssCode').css('height', '150px'); 
    $('#jsCode').css('height', '150px'); 
  }

 
  $('#htmlbtn').click(function() {
    showHtmlBlock();
  });


  $(document).keydown(function(event) {
    if (event.key === '1' && event.altKey) {
      showHtmlBlock();
    }
  });



  function showCssBlock() {
    $('.html').css('display', 'none');
    $('.css').css('display', 'flex');  
    $('.js').css('display', 'none');  
    $('#htmlCode').css('height', '150px'); 
    $('#cssCode').css('height', '450px'); 
    $('#jsCode').css('height', '150px');  
  }

 
  $('#cssbtn').click(function() {
    showCssBlock();
  });


  $(document).keydown(function(event) {
    if (event.key === '2' && event.altKey) {
      showCssBlock();
    }
  });





  function showJsBlock() {
    $('.html').css('display', 'none');
    $('.css').css('display', 'none');  
    $('.js').css('display', 'flex');  
    $('#htmlCode').css('height', '150px'); 
    $('#cssCode').css('height', '150px'); 
    $('#jsCode').css('height', '450px'); 
  }

 
  $('#jsbtn').click(function() {
    showJsBlock();
  });


  $(document).keydown(function(event) {
    if (event.key === '3' && event.altKey) {
      showJsBlock();
    }
  });


  
  function showaAllBlock () {
    $('.html').css('display', 'flex');
    $('.css').css('display', 'flex');  
    $('.js').css('display', 'flex');  
    $('#htmlCode').css('height', '150px'); 
    $('#cssCode').css('height', '150px'); 
    $('#jsCode').css('height', '150px'); 
  }


  $(document).keydown(function(event) {
    if ( event.key === '4' && event.altKey) {
        showaAllBlock();
    }
  });

  

  $(document).ready(function () {
    const canvas = $("#starCanvas")[0];
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const stars = [];
    const numStars = 100; // Кількість зірок
    const maxDistance = 150; // Максимальна відстань для з'єднання лініями
  
    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1; // Швидкість по X
        this.vy = Math.random() * 2 - 1; // Швидкість по Y
        this.size = Math.random() * 2 + 1; // Розмір зірки
      }
  
      move() {
        this.x += this.vx;
        this.y += this.vy;
  
        // Відбивання від країв екрану
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  
    function connectStars() {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
    }
  
    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      stars.forEach((star) => {
        star.move();
        star.draw();
      });
  
      connectStars();
  
      requestAnimationFrame(animate);
    }
  
    function init() {
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
      }
      animate();
    }
  
    $(window).on("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      init();
    });
  
    $(document).on("keydown", function (e) {
      if (e.altKey && e.key === "0") {
        $("#starCanvas").css("display", "flex");
      }
    });
  
    init();
  });
  

  $(document).ready(function () {
    $('#uploadBtn').on('click', function () {
      // Очистити фон перед відкриттям діалогу
      $('#backgroundContainer').css('background-image', '');

      // Створюємо прихований input[type="file"]
      const $input = $('<input type="file" accept="image/*">');

      $input.on('change', function (event) {
        const file = event.target.files[0]; // Отримуємо вибраний файл
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            $('#backgroundContainer').css('background-image', `url(${e.target.result})`);
          };
          reader.readAsDataURL(file); // Читання файлу як data URL
        }
      });

      $input.click(); // Викликаємо діалог вибору файлів
    });

    // Обробник для кнопки "colorPicker"
    $('#colorPicker').on('click', function () {
      $('#backgroundContainer').css('background-image', 'none'); // Видаляємо фон
    });
  });

  
  $('#colorPicker').click(function(){
    $('canvas').css('display','none')
    $('#backgroundContainer').css('background-color', 'white');
    $('#backgroundContainer','image').css('display', 'none');
  })

  $('#uploadBtn').click(function(){
    $('canvas').css('display','none')
    $('#backgroundContainer').css('background-color', 'white');
    $('#backgroundContainer','image').css('display', 'none');
  })


  const colorPicker = document.getElementById('colorPicker');
  const backgroundContainer = document.getElementById('backgroundContainer');
  
  colorPicker.addEventListener('input', function() {
    backgroundContainer.style.backgroundColor = colorPicker.value;
  });



  $(document).ready(function() {
    let clickCount = 0; // Лічильник кількості кліків
  
    $('#changeall').click(function() {
      clickCount++; // Збільшуємо лічильник кліків
  
      if (clickCount === 1) {
        $('.kolo').css( 'background-color' , 'black')
        $('#kolos').css({ 'margin-left': '205px'},
$('p').css('color','white'),
$('label').css('background-color','black'),
$('textarea').css('background-color','black'),
$('.editor').css('background-color','black'),
$('iframe').css('background-color','black'),
$('.output').css('background-color','black'),
$('h2').css('color','white'),
$('i').css('color','black'),
$('textarea').css('color','white')



        )
        
         
      
      } else if (clickCount === 2) {
        // Другий клік — інші зміни
        $('.kolo').css( 'background-color','white')
        $('#kolos').css({ 'margin-left': '0px'},
          $('p').css('color','black'),
         
$('label').css('background-color','white'),
$('textarea').css('background-color','white'),
$('.editor').css('background-color','white'),
$('iframe').css('background-color','white'),
$('.output').css('background-color','white'),
$('h2').css('color','black'),
$('i').css('color','white'),
$('texarea').css('::placeholder',{
  'color':'black'}),
  $('textarea').css('color','black')
  
      )
        clickCount = 0; // Скидаємо лічильник після другого кліку
      }
    });
  });



  $(document).ready(function() {
    $('#musicbtn').click(function() {
      var music = $('#music')[0]; // Отримуємо аудіо елемент
      if (music.paused) {
        music.play(); // Якщо музика на паузі, відтворюємо
      } else {
        music.pause(); // Якщо музика відтворюється, ставимо на паузу
      }
    });
  });

