//CONFIGURAÇÕES HIGHCHARTS
// Add the nodes option through an event call. We want to start with the parent
// item and apply separate colors to each child element, then the same color to
// grandchildren.

let current_panel = null;

Highcharts.addEvent(
  Highcharts.Series,
  'afterSetOptions',
  function (e) {
    var colors = Highcharts.getOptions().colors,
      i = 0,
      nodes = {};
    if (
      this instanceof Highcharts.seriesTypes.networkgraph &&
      e.options.id === 'lang-tree'
    ) {
      e.options.data.forEach(function (link) {

        if (link[0] === "Street Art", 'Arte Pública', 'Graffiti','Mural','Tag','Throw-up','Lettering','Piece','Poster', 'Stencil', 'Sticker','Mosaico', 'Instalações', 'Wildstyle', 'Narrativa Individual', 'Narrativa Coletiva','Narrativa Sociopolítica', 'Narrativa Espacial') {
         
          nodes["Street Art"] = {
            id: "Street Art",
            url: "arquivo_sintra.html",
            text: "Street Art é um fenómeno artístico, expressivo <br> e social à escala global que deu espaço <br> a uma infindável possibilidade de linguagens <br> criadas ou inspiradas no espaço público",
            dataLabels: {
              style:{
                fontSize: "2vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 7
            }
          };

          nodes["Arte Pública"] = {
            id: "Arte Pública",
            url: "arquivo_sintra.html",
            text: "Arte Pública é uma variante inócua, comissionada, <br> institucional e legal da Street Art",
            dataLabels: {
              style:{
                fontSize: "1vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 5
            }
          };

      
          
          nodes['Graffiti'] = {
            id: 'Graffiti',
            url: "arquivo_sintra.html",
            text: "o graffiti é uma arte escrita, pintada ou desenhada <br>  sobre uma parede ou outra superfície, geralmente obscena, <br>  informativa, sem permissão e dentro da vista pública.",
            dataLabels: {
              style:{
                fontSize: "2vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 7
            }
          };


          nodes['Mural'] = {
            id: 'Mural',  
            url: "arquivo_sintra.html",
            text: "O Mural distingue-se pelas pinturas e desenhos  <br> de grandes dimensões, elaborados e, geralmente,  <br> executados de forma legal, diretamente sobre as paredes, <br> edifícios e muros do espaço público",
            dataLabels: {
              style:{
                fontSize: "2vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 7
            }
          };
          nodes['Tag'] = {
            id: 'Tag',
            url: "arquivo_sintra.html",
            text: "O tag é conhecido e caracterizado como <br> a forma mais básica do graffiti ",
            dataLabels: {
              style:{
                fontSize: "1.5vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                stroke: "#0000",
                letterSpacing: 0
              }
            },
            marker: {
              radius:6
            }
          };
      
          nodes['Throw-up'] = {
            id: 'Throw-up',
            url: "arquivo_sintra.html",
            text: "O throw-up, throw ou throwie é visto como uma <br> versão mais complexa e elaborada de um tag",
            dataLabels: {
              style:{
                fontSize: "1.5vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 6
            }
          };
          nodes['Wildstyle'] = {
            id: 'Wildstyle',
            url: "arquivo_sintra.html",
            text: "O wildstyle é a forma mais complexa <br> de um piece e é composto por letras e formas<br> intrincadas e sobrepostas entre si",
            dataLabels: {
              style:{
                fontSize: "1vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 5
            }
          };
          nodes['Lettering'] = {
            id: 'Lettering',
            url: "arquivo_sintra.html",
            text: "O Lettering consiste num desenho  personalizado <br> de uma ou várias letras, em grandes dimensões",
             dataLabels: {
              style:{
                fontSize: "1.5vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 6
            }
          };
          
          nodes['Piece'] = {
            id: 'Piece',
            url: "arquivo_sintra.html",
            text: "O piece é uma obra grande, complexa e demorada, <br> geralmente, escrita e pintada por writers experientes e habilidosos",
            dataLabels: {
              style:{
                fontSize: "0.7vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 3
            }
          };
          
  
          
          nodes['Instalações'] = {
            id: 'Instalações',
            url: "arquivo_sintra.html",
            text: "As Instalações são obras de arte que se encontram, <br> habitualmente, instaladas no espaço público  <br> e estão acessíveis ao público, como o graffiti, de forma gratuita",
            dataLabels: {
              style:{
                fontSize: "1vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 5
            }
          };
          
          nodes['Sticker'] = {
            id: 'Sticker',
            url: "arquivo_sintra.html",
            text: "O sticker, ou autocolante, surge do princípio mais básico <br> do graffiti: espalhar o nome pelo máximo de locais possíveis, <br> com o objetivo final de atingir a fama no meio ",
            dataLabels: {
              style:{
                fontSize: "0.7vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 3
            }
          };
          nodes['Stencil'] = {
            id: 'Stencil',
            url: "arquivo_sintra.html",
            text: "O stencil envolve a utilização de um molde, naturalmente, <br> pré-recortado para criar um ou vários desenhos sobre <br> uma superfície à escolha, através do uso de <br> tintas spray e outros materiais",
            dataLabels: {
              style:{
                fontSize: "0.7vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 3
            }
          };
          
          nodes['Poster'] = {
            id: 'Poster',
            url: "arquivo_sintra.html",
            text: "O poster, ou cartaz, é uma tipologia da Street Art <br> que se baseia na disseminação visual de informação <br> através de gráficos, imagens e textos visualmente apelativos",
            dataLabels: {
              style:{
                fontSize: "0.7vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 3
            }
          };
          nodes['Mosaico'] = {
            id: 'Mosaico',
            url: "arquivo_sintra.html",
            text: "O mosaico é uma técnica utilizada em alternativa à <br> tinta e resulta da colagem de pequenos quadrados de vidro,<br>  pedra, plástico ou azulejo, de forma a perfazer uma imagem ",
            dataLabels: {
              style:{
                fontSize: "0.7vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 3
            }
          };
         
          nodes['Narrativa Individual'] = {
            id: 'Narrativa Individual',
            url: "arquivo_sintra.html",
            text: "As narrativas individuais têm um caracter pessoal e íntimo,<br> o que as torna menos obvias ou relacionáveis <br> com o publico fora do contexto individual",
            dataLabels: {
              style:{
                fontSize: "1.5vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 6
            }
          };  
          nodes['Narrativa Coletiva'] = {
            id: 'Narrativa Coletiva',
            url: "arquivo_sintra.html",
            text: "As narrativas coletivas surgem como o oposto das narrativas <br> e abarcam questões globalmente conhecidas que afetam  <br> uma vasta parte da população, tendo como argumento principal <br> a justiça, a transparência e a inclusão social",
            dataLabels: {
              style:{
                fontSize: "1vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 5
            }
          }; 
           
          nodes['Narrativa Sociopolítica'] = {
            id: 'Narrativa Sociopolítica',
            url: "arquivo_sintra.html",
            text: "As narrativas sociopolíticas e ativas desafiam as estruturas <br> de poder, amplificam as vozes marginalizadas e suscitam diálogo, <br> contribuindo para a mudança, a justiça e a igualdade social.",
            dataLabels: {
              style:{
                fontSize: "1vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 5
            }
          };
       
          nodes['Narrativa Espacial'] = {
            id: 'Narrativa Espacial',
            url: "arquivo_sintra.html",
            text: "As narrativas espaciais estão ligadas à contestação local,<br> às áreas negligenciadas, à gentrificação e a outras preocupações políticas <br> que de alguma forma, se refletem no ambiente físico",
            dataLabels: {
              style:{
                fontSize: "0.5vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0
              }
            },
            marker: {
              radius: 3
            }
          };
     
      
          

          nodes[link[1]] = {
            id: link[1],
            url: "arquivo_sintra.html",
            dataLabels: {
              style:{
                fontSize: "0.5vw",
                fontWeight:"light",
                fontfamily: "ocr-aregular",
                color: "#ffffff",
                letterSpacing: 0,
            

              }
            },
         
          };
        } else if (nodes[link[0]] && nodes[link[0]].color) {
          nodes[link[1]] = {
            id: link[1],
          };
        }
      });

      e.options.nodes = Object.keys(nodes).map(function (id) {
        return nodes[id];
      });
    }
  }
);






Highcharts.chart("container7", {

  
  chart: {
      type: 'networkgraph', 
      alignTicks: true,
      marginTop: 0,
      marginBottom:0,
      marginRight: 0, 
      marginLeft: 0,
      height: 0,

  },

  tooltip: {
        
        enabled: true,
        borderColor: '1px',
        borderColor: '#000000',
        borderRadius: '0',
        padding: 10,
        formatter: function() {
          const {
            text
          } = this.point.options;
          return '' + text 
        }
  },

  title: {
    text: ''
  },
  
  plotOptions: {
    series: { 
      cursor: "pointer",
      allowPointSelect: false,
      point: {
          events: {
              click: function () {
                location.href = this.options.url;
              
                   }  
                 },

           
                 
               },
               
    
    
    },

    networkgraph: {
        keys: ['from', 'to'],
            layoutAlgorithm: {
              enableSimulation: true,
        
              //linkLength: 320 ,
              //integration: 'verlet',
                // Elastic like forces:
                /*repulsiveForce: function (d, k) {
                    return Math.max(-(d * d) / (d * 1000), -80);
                },*/
                initialPositions: 'random',
                integration: 'verlet',
                // Elastic like forces:
                attractiveForce: function (d, k) {
                    return Math.max(-(d * d) / (k * 4000), -1);
                },
              gravitationalConstant: 25,
      },

      link: {
        width: 2,      
        dashStyle: 'none'
    },



  
        states:{
          hover:{
            halo: null,
          },
          inactive:{
            halo: null,
          },
        },

      marker:{
          lineWidth: 1,
          fillColor: "#ffffff",
  
          states: {
              hover: {
                lineWidthPlus:null,
                radiusPlus:null,
              }
          },
          symbol: "square",
          hover:{
            halo: {
              opacity:0,
            }
          }
        }
      }
    },

   credits: {
    enabled: false
  },

  

  series: [{

    networkgraph:{
      link:{
        color: "#ffffff"
      }
    },
    dataLabels: { 
      enabled: 'false',
      width: '0%',
      textPath: {
        enabled: false,
      },
      linkFormat: '',
      allowOverlap: true,
      style:{
        fontSize: "1vw",
        textOutline: "none",
        fontWeight:"100",
        color: "#ffffff",
  
        fontfamily: "ocr-aregular",
      },
    },
        
        
        
        
      
    

      id: "lang-tree",
      data: window.netdata7,
      events: {
        click: function(ev) {
     
        }
     
      }

      
    },
  ],

 
});

