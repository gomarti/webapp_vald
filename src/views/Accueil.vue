<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <h1>Vald</h1>
    </header>

    <!-- Filtres -->
    <div class="filters">
      <button
        :style="getButtonStyle('date')"
        @click="toggleSort('date')"
      >
        Date
        <span v-if="sortState.date === 1">↑</span>
        <span v-else-if="sortState.date === 2">↓</span>
      </button>

      <button
        :style="getButtonStyle('album')"
        @click="toggleSort('album')"
      >
        Album
        <span v-if="sortState.album === 1">↑</span>
        <span v-else-if="sortState.album === 2">↓</span>
      </button>

      <button
        :style="getButtonStyle('ecoute')"
        @click="toggleSort('ecoute')"
      >
        Écoutes
        <span v-if="sortState.ecoute === 1">↑</span>
        <span v-else-if="sortState.ecoute === 2">↓</span>
      </button>
    </div>

    <!-- Liste des morceaux -->
    <transition-group
      name="flip-list"
      tag="div"
      class="morceaux-grid"
    >
      <router-link
        v-for="morceau in morceauxAffiches"
        :key="morceau.id"
        :to="`/morceau/${morceau.id}`"
        class="morceau"
      >
        <img :src="morceau.acf.image.url" :alt="morceau.acf.image.title" />
        <p class="titre">{{ morceau.title }}</p>
        <p class="album-taxo" v-if="morceau.album?.length">{{ morceau.album[0].nom }}</p>
      </router-link>
    </transition-group>

    <a
  href="https://open.spotify.com/intl-fr/artist/3CnCGFxXbOA8bAK54jR8js?si=hc1lOQk5TKWlWAKmO-di-w"
  target="_blank"
  rel="noopener"
  class="spotify-logo"
>
  <img src="../assets/Spotify.png" alt="Spotify Vald" />
</a>

  </div>
</template>

<script>
export default {
  data() {
    return {
      morceauxOriginaux: [],
      morceaux: [],
      sortState: {
        date: 1,   // par défaut trié par date ascendant
        album: 0,
        ecoute: 0,
      },
    };
  },
  computed: {
    morceauxAffiches() {
      return this.morceaux;
    },
  },
  mounted() {
    fetch("https://sae401-25.mmi-stdie.fr/ugom/wp-json/vald/v1/morceaux/")
      .then((res) => res.json())
      .then((data) => {
        this.morceauxOriginaux = [...data];
        this.morceaux = [...data];
        // Appliquer tri initial par date (asc)
        this.morceaux.sort((a, b) => this.compare(a, b, "date", true));
      });
  },
  methods: {
    toggleSort(critere) {
      this.sortState[critere] = (this.sortState[critere] + 1) % 3;

      // Réinitialise les autres
      Object.keys(this.sortState).forEach((key) => {
        if (key !== critere) this.sortState[key] = 0;
      });

      if (this.sortState[critere] === 0) {
        // Retour à l’état initial (tri par date ascendant)
        this.sortState.date = 1;
        this.morceaux = [...this.morceauxOriginaux];
        this.morceaux.sort((a, b) => this.compare(a, b, "date", true));
      } else {
        const asc = this.sortState[critere] === 1;
        this.morceaux.sort((a, b) => this.compare(a, b, critere, asc));
      }
    },

    compare(a, b, critere, asc = true) {
      let valA, valB;

      if (critere === "date") {
        valA = new Date(a.acf.date);
        valB = new Date(b.acf.date);
      } else if (critere === "album") {
        valA = a.album?.[0]?.nom?.toLowerCase() || "";
        valB = b.album?.[0]?.nom?.toLowerCase() || "";
      } else if (critere === "ecoute") {
        valA = Number(a.acf.nombreEcoute);
        valB = Number(b.acf.nombreEcoute);
      }

      if (valA < valB) return asc ? -1 : 1;
      if (valA > valB) return asc ? 1 : -1;
      return 0;
    },

    getButtonStyle(critere) {
      const state = this.sortState[critere];
      let bg = "#1F1F1F";
      let color = "white";

      if (state === 1) {
        bg = "#FFFFFF";
        color = "#121212";
      } else if (state === 2) {
        bg = "#121212";
        color = "white";
      }

      return {
        backgroundColor: bg,
        color: color,
      };
    },
  },
};
</script>

<style scoped>
@import'../../css/main.css';
</style>