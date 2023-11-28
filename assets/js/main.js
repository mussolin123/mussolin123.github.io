/*
	jogo da cobrinha aqui

	
*/



(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

			window.onload = function(){
      
				//pegar o elemento canvas pelo ID  
					  let area = document.getElementById('area')
				
				//capturar o quadro de pontuação
				let pontos = document.getElementById('pontos')
				let pontoi = 0
				// define o contexto do elemento area para 2d
					  let ctx = area.getContext("2d")
			
					  document.addEventListener("keydown", keyPush)
				
				const easy = document.getElementById('js-easy')
				const middle = document.getElementById('js-middle')
				const hard = document.getElementById('js-hard')
		  
					  setInterval(game, 70)
			
		   
				//Quantidade de casas que a cobra irá andar em cada atualização de quadro
					  const vel = 1
		  
				//Velocidade inicial
					  let vx = 0
				let vy = 0 
				
				//ponto inicial
					  let px = 10
					  let py = 15
				
				// Tamanho do ponto
					  const tp = 20
				
				// quantidade de pontos
					  const qp = 20
				
				// Eixo inicial da Maçã
					  let applex = 15
				let appley = 15
		  
				// Array para o rastro da cobra
					  let trail = []
				
					  function game(){
				  
						  px += vx
						  py += vy
				  
				  //controle da cobra dentro do quadro para repetição nas bordas
						  if (px < 0) {
							  px = qp-1
						  }
						  if (px > qp-1) {
							  px = 0
						  }
						  if (py < 0) {
							  py = qp-1
						  }
						  if (py > qp-1) {
							  py = 0
						  }
		  
						  ctx.fillStyle = "#111D4A"
				  //sintaxe JavaScript:	contexto.fillRect ( x, y, largura, altura );
						  ctx.fillRect(0,0, area.width, area.height)
		  
						  ctx.fillStyle = "#EA2B1F"
						  ctx.fillRect(applex*tp, appley*tp, tp,tp,2,2)
		  
				  //for ([expressaoInicial]; [condicao]; [incremento]) declaracao
						  for (let i = 0; i < trail.length; i++) {
							ctx.fillStyle = "#09BC8A"
					ctx.strokeStyle = "#004346"
							  ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp,tp)
					ctx.strokeRect(trail[i].x*tp, trail[i].y*tp, tp,tp)
							   if (trail[i].x == px && trail[i].y == py)
							  {
								  vx = vy = 0
								  tail = 2
					  pontoi = 0
							  }
						  }
		  
						  trail.push({x:px,y:py})
				  
						  while (trail.length > tail) {
							  trail.shift()
						  }
				  
				  
						  if (applex==px && appley==py){
							  tail++
							  applex = Math.floor(Math.random()*qp)
							  appley = Math.floor(Math.random()*qp)
					
					pontos.innerHTML = ++pontoi
						  }
				  
				
					  }
		  
				window.addEventListener("keydown", function(e) {
				  // space and arrow keys
				  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
					  e.preventDefault();
				  }
			  }, false);
			
				let lastKeyPressed = ""
			
					  function keyPush(e){
						  switch (e.keyCode) {
							  case 37: // Left
					  if(lastKeyPressed != "right"){
								  vx = -vel
								  vy = 0
					  lastKeyPressed = "left"
						}
								  break
							  case 38: // up
					  if(lastKeyPressed != "down"){
								  vx = 0
								  vy = -vel
					  lastKeyPressed = "up"
					  }
								  break
							  case 39: // right
					  if(lastKeyPressed != "left"){
								  vx = vel
								  vy = 0
					  lastKeyPressed = "right"
					  }
								  break
							  case 40: // down
					  if(lastKeyPressed != "up"){
								  vx = 0
								  vy = vel
					  lastKeyPressed = "down"
					  }
								  break
						  }
					  }
		  
				  }
		  

				  function JogoDaVelha(){
					const arraysVitoria = [
					  [1,0,0,1,0,0,1,0,0],
					  [0,1,0,0,1,0,0,1,0],
					  [0,0,1,0,0,1,0,0,1],
					  [1,1,1,0,0,0,0,0,0],
					  [0,0,0,1,1,1,0,0,0],
					  [0,0,0,0,0,0,1,1,1],
					  [0,0,1,0,1,0,1,0,0],
					  [1,0,0,0,1,0,0,0,1]
					];
				  
					const jogadores = [
					  {
						nome: "Jogador 1",
						marcador: "X",
						pontos: 0
					  },
					  {
						nome: "Jogador 2",
						marcador: "O",
						pontos: 0
					  }
					];
				  
					const $domPlacarPlayer1 = document.querySelector('#pontos-player-1'),
						  $domPlacarPlayer2 = document.querySelector('#pontos-player-2'),
						  $domPlayer1       = document.querySelector('[data-player="1"]'),
						  $domPlayer2       = document.querySelector('[data-player="2"]');
				  
					let rodadas  = 1,
						vezAtual = jogadores[0],
						arrayDom = [];
				  
					const proximoJogador = () => {
					  if(vezAtual.nome == jogadores[0].nome){
						$domPlayer1.classList.remove("marcar-vez");
						$domPlayer2.classList.add("marcar-vez");
						vezAtual = jogadores[1];
					  }else{
						$domPlayer2.classList.remove("marcar-vez");
						$domPlayer1.classList.add("marcar-vez");
						vezAtual = jogadores[0];
					  }
					}
				  
					const marcarJogada = $domElemento => {
					  $domElemento.innerHTML = vezAtual.marcador
					  $domElemento.setAttribute("marcado", true);
					};
				  
					const verificarVitoria = () => {
					  return new Promise((sucess, error) => {
						let vitoria = false;
						arraysVitoria.forEach(array => {
						  let count = 0;
						  for(let indice in array){
							if(array[indice] == 1){
							  if(array[indice] == arrayDom[indice]){
								count++;
							  }
							}
						  }
				  
						  if(count >= 3){
							vitoria = true;
						  }
						})
						sucess(vitoria);
					  })
					}
				  
					const mapearDom = () => {
					  let $td = [...document.querySelectorAll("#jogo-velha td")];
					  arrayDom = $td.map(e => (e.innerHTML == vezAtual.marcador) ? 1 : 0); 
					}
				  
					const registrarPonto = () => {
					  (vezAtual.nome == jogadores[0].nome) ? jogadores[0].pontos++ : jogadores[1].pontos++;
					  $domPlacarPlayer1.innerHTML = jogadores[0].pontos;
					  $domPlacarPlayer2.innerHTML = jogadores[1].pontos;
					}
				  
					const recomecarJogo = () => {
					  const $td           = document.querySelectorAll("#jogo-velha td"),
							$domQtdRodada = document.querySelector("#quantidade-rodada");
				  
					  $td.forEach(e => {
						e.innerHTML = '';
						e.removeAttribute("marcado");
					  })
				  
					  $domQtdRodada.innerHTML = rodadas;
					}
				  
					const registrarRodada = () => rodadas++;
				  
					const verificarVelha = () => {
					  let countTd = document.querySelectorAll('td[marcado="true"]').length;
					  if(countTd == 9){
						alert("Oops, deu velha");
						registrarRodada();
						recomecarJogo();
					  }
					}
				  
					this.registrarJogada = $domElemento => {
					  marcarJogada($domElemento);
					  mapearDom();
					  verificarVitoria()
						.then(result => {
						if(result){
						  registrarPonto();
						  registrarRodada();
						  alert(`${vezAtual.nome} venceu a rodada`);
						  recomecarJogo();
						}else{
						  verificarVelha();
						  proximoJogador();
						}
					  })
					}
				  }
				  
				  // --------------------------------------------------------------------
				  
				  const $domGame = document.querySelector("#jogo-velha"),
						Jogo     = new JogoDaVelha();
				  
				  $domGame.addEventListener("click", e => {
					if(e.target.nodeName == "TD" && !e.target.attributes.marcado){
					  Jogo.registrarJogada(e.target);
					}
				  })

				  

})(jQuery);