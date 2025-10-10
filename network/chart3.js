let current_panel = null;

Highcharts.addEvent(Highcharts.Series, 'afterSetOptions', function (e) {
  let nodes = {};
  if (this instanceof Highcharts.seriesTypes.networkgraph && e.options.id === 'lang-tree') {
    e.options.data.forEach(function (link) {
      const nodeList = [
        "Street Art", "Arte Pública", "Graffiti", "Mural", "Tag", "Throw-up", "Lettering",
        "Piece", "Stencil", "Mosaico", "Narrativa Individual", "Narrativa Coletiva",
        "Narrativa Sociopolítica", "Narrativa Espacial"
      ];

      if (nodeList.includes(link[0])) {
        // Define your nodes (keeping same descriptions)
        nodes["Street Art"] = {
          id: "Street Art",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "Street Art é um fenómeno artístico, expressivo <br> e social à escala global...",
          marker: { radius: 7 }
        };

        nodes["Arte Pública"] = {
          id: "Arte Pública",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "Arte Pública é uma variante inócua, comissionada...",
          marker: { radius: 5 }
        };

        nodes["Graffiti"] = {
          id: "Graffiti",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O graffiti é uma arte escrita, pintada ou desenhada...",
          marker: { radius: 7 }
        };

        nodes["Mural"] = {
          id: "Mural",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O Mural distingue-se pelas pinturas e desenhos...",
          marker: { radius: 6 }
        };

        nodes["Tag"] = {
          id: "Tag",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O tag é conhecido e caracterizado como a forma mais básica...",
          marker: { radius: 6 }
        };

        nodes["Throw-up"] = {
          id: "Throw-up",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O throw-up é visto como uma versão mais complexa...",
          marker: { radius: 6 }
        };

        nodes["Lettering"] = {
          id: "Lettering",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O Lettering consiste num desenho personalizado...",
          marker: { radius: 6 }
        };

        nodes["Piece"] = {
          id: "Piece",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O piece é uma obra grande, complexa e demorada...",
          marker: { radius: 5 }
        };

        nodes["Stencil"] = {
          id: "Stencil",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O stencil envolve a utilização de um molde...",
          marker: { radius: 5 }
        };

        nodes["Mosaico"] = {
          id: "Mosaico",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "O mosaico é uma técnica alternativa à tinta...",
          marker: { radius: 3 }
        };

        nodes["Narrativa Individual"] = {
          id: "Narrativa Individual",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "As narrativas individuais têm um caráter pessoal e íntimo...",
          marker: { radius: 6 }
        };

        nodes["Narrativa Coletiva"] = {
          id: "Narrativa Coletiva",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "As narrativas coletivas abordam questões globais...",
          marker: { radius: 5 }
        };

        nodes["Narrativa Sociopolítica"] = {
          id: "Narrativa Sociopolítica",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "As narrativas sociopolíticas desafiam estruturas de poder...",
          marker: { radius: 3 }
        };

        nodes["Narrativa Espacial"] = {
          id: "Narrativa Espacial",
          url: "arquivo.html?action=montelavaralmargemperopinheiro",
          text: "As narrativas espaciais estão ligadas à contestação local...",
          marker: { radius: 3 }
        };

        nodes[link[1]] = {
          id: link[1],
          url: "arquivo.html?action=montelavaralmargemperopinheiro"
        };
      }
    });
    e.options.nodes = Object.values(nodes);
  }
});

Highcharts.chart("container3", {
  chart: {
    type: 'networkgraph',
    backgroundColor: 'transparent',
    margin: [0, 0, 0, 0],
    height: '100%',
    events: {
      load: function () {
        const series = this.series[0];
        setInterval(() => series.layout.restartSimulation(), 1000); // Keep moving
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
                window.location.href = this.options.url; // double click
              } else {
                // single click → show tooltip manually
                const chart = this.series.chart;
                chart.tooltip.refresh(this);
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
    data: window.netdata3,
    marker: {
      lineWidth: 1,
      fillColor: "#ffffff",
      symbol: "square"
    }
  }]
});
