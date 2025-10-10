let current_panel = null;

Highcharts.addEvent(Highcharts.Series, 'afterSetOptions', function (e) {
  let nodes = {};
  if (this instanceof Highcharts.seriesTypes.networkgraph && e.options.id === 'lang-tree') {
    e.options.data.forEach(function (link) {
      const nodeList = [
        "Street Art", "Arte Pública", "Graffiti", "Mural", "Tag", "Throw-up", "Lettering",
        "Piece", "Wildstyle", "Narrativa Individual", "Narrativa Coletiva",
        "Narrativa Comercial", "Narrativa Sociopolítica", "Narrativa Espacial"
      ];

      if (nodeList.includes(link[0])) {
        nodes["Street Art"] = {
          id: "Street Art",
          url: "arquivo.html?action=agualva-cacem",
          text: "Street Art é um fenómeno artístico, expressivo <br> e social à escala global que deu espaço <br> a uma infindável possibilidade de linguagens <br> criadas ou inspiradas no espaço público.",
          marker: { radius: 7 }
        };

        nodes["Arte Pública"] = {
          id: "Arte Pública",
          url: "arquivo.html?action=agualva-cacem",
          text: "Arte Pública é uma variante inócua, comissionada, institucional e legal da Street Art.",
          marker: { radius: 6 }
        };

        nodes["Graffiti"] = {
          id: "Graffiti",
          url: "arquivo.html?action=agualva-cacem",
          text: "O graffiti é uma arte escrita, pintada ou desenhada sobre uma parede ou outra superfície, geralmente sem permissão e à vista do público.",
          marker: { radius: 7 }
        };

        nodes["Mural"] = {
          id: "Mural",
          url: "arquivo.html?action=agualva-cacem",
          text: "O Mural distingue-se pelas pinturas e desenhos de grandes dimensões, elaborados e geralmente legais, diretamente sobre paredes e edifícios.",
          marker: { radius: 7 }
        };

        nodes["Tag"] = {
          id: "Tag",
          url: "arquivo.html?action=agualva-cacem",
          text: "O tag é conhecido e caracterizado como a forma mais básica do graffiti.",
          marker: { radius: 3 }
        };

        nodes["Throw-up"] = {
          id: "Throw-up",
          url: "arquivo.html?action=agualva-cacem",
          text: "O throw-up, ou throwie, é visto como uma versão mais complexa e elaborada de um tag.",
          marker: { radius: 3 }
        };

        nodes["Wildstyle"] = {
          id: "Wildstyle",
          url: "arquivo.html?action=agualva-cacem",
          text: "O wildstyle é a forma mais complexa de um piece, composto por letras e formas intrincadas e sobrepostas entre si.",
          marker: { radius: 3 }
        };

        nodes["Lettering"] = {
          id: "Lettering",
          url: "arquivo.html?action=agualva-cacem",
          text: "O Lettering consiste num desenho personalizado de uma ou várias letras, em grandes dimensões.",
          marker: { radius: 5 }
        };

        nodes["Piece"] = {
          id: "Piece",
          url: "arquivo.html?action=agualva-cacem",
          text: "O piece é uma obra grande, complexa e demorada, geralmente criada por writers experientes e habilidosos.",
          marker: { radius: 3 }
        };

        nodes["Narrativa Individual"] = {
          id: "Narrativa Individual",
          url: "arquivo.html?action=agualva-cacem",
          text: "As narrativas individuais têm um caráter pessoal e íntimo, menos relacionáveis fora do contexto individual.",
          marker: { radius: 5 }
        };

        nodes["Narrativa Coletiva"] = {
          id: "Narrativa Coletiva",
          url: "arquivo.html?action=agualva-cacem",
          text: "As narrativas coletivas abordam questões globais, promovendo justiça, transparência e inclusão social.",
          marker: { radius: 6 }
        };

        nodes["Narrativa Comercial"] = {
          id: "Narrativa Comercial",
          url: "arquivo.html?action=agualva-cacem",
          text: "As narrativas comerciais apresentam um interesse publicitário ou corporativo, geralmente comissionadas.",
          marker: { radius: 3 }
        };

        nodes["Narrativa Sociopolítica"] = {
          id: "Narrativa Sociopolítica",
          url: "arquivo.html?action=agualva-cacem",
          text: "As narrativas sociopolíticas desafiam as estruturas de poder e amplificam vozes marginalizadas, promovendo mudança e justiça.",
          marker: { radius: 5 }
        };

        nodes["Narrativa Espacial"] = {
          id: "Narrativa Espacial",
          url: "arquivo.html?action=agualva-cacem",
          text: "As narrativas espaciais estão ligadas à contestação local, à gentrificação e a preocupações políticas refletidas no ambiente físico.",
          marker: { radius: 5 }
        };

        nodes[link[1]] = {
          id: link[1],
          url: "arquivo.html?action=agualva-cacem"
        };
      }
    });
    e.options.nodes = Object.values(nodes);
  }
});

Highcharts.chart("container10", {
  chart: {
    type: 'networkgraph',
    backgroundColor: 'transparent',
    margin: [0, 0, 0, 0],
    height: '100%',
    events: {
      load: function () {
        const series = this.series[0];
        setInterval(() => series.layout.restartSimulation(), 1000);
      }
    }
  },

  title: { text: '' },

  tooltip: {
    enabled: true,
    useHTML: true,
    hideDelay: 0,
    formatter: function () {
      return this.point.options.text || '';
    },
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderColor: '#000000',
    borderRadius: 6,
    padding: 10,
    style: {
      color: '#ffffff',
      fontFamily: 'ocr-aregular',
      fontSize: '1rem'
    }
  },

  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: (function () {
          let lastClickTime = 0;
          return {
            click: function () {
              const now = Date.now();
              if (now - lastClickTime < 400 && this.options.url) {
                window.location.href = this.options.url;
              } else {
                this.series.chart.tooltip.refresh(this);
              }
              lastClickTime = now;
            }
          };
        })()
      }
    },
    networkgraph: {
      keys: ['from', 'to'],
      layoutAlgorithm: {
        enableSimulation: true,
        integration: 'verlet',
        initialPositions: 'random',
        gravitationalConstant: 25
      },
      link: {
        width: 2,
        color: '#ffffff'
      },
      dataLabels: {
        enabled: true,
        linkFormat: '',
        allowOverlap: true,
        style: {
          fontSize: "1vw",
          textOutline: "none",
          color: "#ffffff",
          fontFamily: "ocr-aregular"
        }
      }
    }
  },

  credits: { enabled: false },

  series: [{
    id: "lang-tree",
    data: window.netdata10,
    marker: {
      lineWidth: 1,
      fillColor: "#ffffff",
      symbol: "square"
    }
  }]
});
