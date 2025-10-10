// ===========================
// CONFIGURAÇÕES HIGHCHARTS
// ===========================
let current_panel = null;

Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
  const nodes = {};

  if (this instanceof Highcharts.seriesTypes.networkgraph && e.options.id === "lang-tree") {
    e.options.data.forEach(function (link) {
      const mainNodes = [
        "Street Art", "Arte Pública", "Graffiti", "Mural", "Tag", "Throw-up", "Lettering",
        "Piece", "Poster", "Mosaico", "Narrativa Individual", "Narrativa Coletiva",
        "Narrativa Comercial", "Narrativa Sociopolítica", "Narrativa Espacial"
      ];

      if (mainNodes.includes(link[0])) {
        // ✅ Define nodes with descriptions
        nodes["Street Art"] = {
          id: "Street Art",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Street Art é um fenómeno artístico, expressivo e social à escala global...",
          dataLabels: {
            style: { fontSize: "1.8vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 8 }
        };

        nodes["Arte Pública"] = {
          id: "Arte Pública",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Arte Pública é uma variante inócua, comissionada, institucional e legal da Street Art.",
          dataLabels: {
            style: { fontSize: "1.3vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 6 }
        };

        nodes["Graffiti"] = {
          id: "Graffiti",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O graffiti é uma arte escrita, pintada ou desenhada sobre uma parede ou superfície pública.",
          dataLabels: {
            style: { fontSize: "1.8vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 7 }
        };

        nodes["Mural"] = {
          id: "Mural",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O Mural distingue-se pelas pinturas e desenhos de grandes dimensões, geralmente legais.",
          dataLabels: {
            style: { fontSize: "1.5vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 6 }
        };

        nodes["Tag"] = {
          id: "Tag",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O tag é conhecido como a forma mais básica do graffiti.",
          dataLabels: {
            style: { fontSize: "1.8vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 7 }
        };

        nodes["Throw-up"] = {
          id: "Throw-up",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O throw-up é uma versão mais complexa e elaborada de um tag.",
          dataLabels: {
            style: { fontSize: "1.5vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 6 }
        };

        nodes["Lettering"] = {
          id: "Lettering",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O Lettering consiste num desenho personalizado de letras em grandes dimensões.",
          dataLabels: {
            style: { fontSize: "1.5vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 6 }
        };

        nodes["Piece"] = {
          id: "Piece",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O piece é uma obra grande, complexa e demorada, feita por writers experientes.",
          dataLabels: {
            style: { fontSize: "1.2vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 5 }
        };

        nodes["Poster"] = {
          id: "Poster",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O poster é uma tipologia da Street Art que dissemina informação visual.",
          dataLabels: {
            style: { fontSize: "1vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 4 }
        };

        nodes["Mosaico"] = {
          id: "Mosaico",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "O mosaico utiliza pequenos quadrados de vidro, pedra ou azulejo para criar imagens.",
          dataLabels: {
            style: { fontSize: "1vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 4 }
        };

        nodes["Narrativa Individual"] = {
          id: "Narrativa Individual",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Narrativas individuais têm caráter pessoal e íntimo, menos relacionável ao público geral.",
          dataLabels: {
            style: { fontSize: "1.5vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 6 }
        };

        nodes["Narrativa Coletiva"] = {
          id: "Narrativa Coletiva",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Narrativas coletivas abordam questões sociais, de justiça e inclusão.",
          dataLabels: {
            style: { fontSize: "1.2vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 5 }
        };

        nodes["Narrativa Comercial"] = {
          id: "Narrativa Comercial",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Narrativas comerciais têm fins promocionais ou publicitários.",
          dataLabels: {
            style: { fontSize: "1vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 4 }
        };

        nodes["Narrativa Sociopolítica"] = {
          id: "Narrativa Sociopolítica",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Narrativas sociopolíticas desafiam o poder e promovem justiça e igualdade.",
          dataLabels: {
            style: { fontSize: "1vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 4 }
        };

        nodes["Narrativa Espacial"] = {
          id: "Narrativa Espacial",
          url: "arquivo.html?action=saojoaodaslampasterrugem",
          text: "Narrativas espaciais refletem preocupações políticas e gentrificação local.",
          dataLabels: {
            style: { fontSize: "1vw", fontFamily: "ocr-aregular", color: "#ffffff" }
          },
          marker: { radius: 4 }
        };
      }
    });

    e.options.nodes = Object.values(nodes);
  }
});

// ===========================
// CHART CONFIG
// ===========================
Highcharts.chart("container0", {
  chart: {
    type: "networkgraph",
    backgroundColor: "transparent",
    margin: [0, 0, 0, 0],
    height: "100%",
    events: {
      load: function () {
        const chart = this;
        const series = chart.series[0];
        // keep nodes moving forever
        setInterval(() => {
          if (series && series.layout) series.layout.restartSimulation();
        }, 500);
      },
    },
  },

  title: { text: "" },

  tooltip: {
    enabled: true,
    useHTML: true,
    hideDelay: 999999,
    formatter: function () {
      return this.point.options.text || "";
    },
    backgroundColor: "rgba(0,0,0,0.85)",
    borderColor: "#000",
    borderRadius: 6,
    padding: 10,
    style: {
      color: "#ffffff",
      fontFamily: "ocr-aregular",
      fontSize: "1rem",
    },
  },

  plotOptions: {
    series: {
      cursor: "pointer",
      allowPointSelect: false,
      point: {
        events: {
          click: function () {
            const chart = this.series.chart;
            const now = Date.now();
            const DOUBLE_CLICK_DELAY = 300;

            if (!chart.customClick) chart.customClick = { lastTime: 0, lastId: null };

            // detect double click
            if (
              chart.customClick.lastId === this.id &&
              now - chart.customClick.lastTime < DOUBLE_CLICK_DELAY
            ) {
              if (this.options.url) window.location.href = this.options.url;
              chart.customClick = { lastTime: 0, lastId: null };
            } else {
              chart.tooltip.refresh(this);
              chart.customClick = { lastTime: now, lastId: this.id };
            }
          },
        },
      },
    },

    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: true,
        integration: "verlet",
        initialPositions: "random",
        gravitationalConstant: 25,
      },
      link: {
        width: 2,
        color: "#ffffff",
      },
      dataLabels: {
        enabled: true,
        linkFormat: "", // no text on links
        textPath: { enabled: false },
        allowOverlap: true,
        style: {
          fontSize: "1vw",
          textOutline: "none",
          fontWeight: "100",
          color: "#ffffff",
          fontFamily: "ocr-aregular",
        },
      },
    },
  },

  credits: { enabled: false },

  series: [
    {
      id: "lang-tree",
      data: window.netdata,
      marker: {
        lineWidth: 1,
        fillColor: "#ffffff",
        symbol: "square",
      },
    },
  ],
});
