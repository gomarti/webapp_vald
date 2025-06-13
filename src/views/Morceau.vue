<template>
  <div class="morceau-detail" v-if="morceau">
    <!-- Bouton retour -->
    <div class="header">
      <button class="btn-retour" @click="retour">←</button>
    </div>

    <!-- Cover avec animation depuis le haut -->
    <div class="banniere" :class="{ visible: imageVisible }">
      <img :src="morceau.acf.image.url" :alt="morceau.acf.image.title" />
    </div>

    <!-- Infos avec animation depuis le bas -->
    <div class="infos" :class="{ visible: infosVisible }">
      <div class="gauche">
        <h1>{{ morceau.title }}</h1>
        <p class="artistes">
          Vald<span v-if="morceau.acf.feat"> feat. {{ morceau.acf.feat }}</span>
        </p>
      </div>
      <div class="droite">
        <p class="album">{{ morceau.album[0]?.nom }}</p>
        <p class="date">{{ morceau.acf.date }}</p>
      </div>
    </div>

    <!-- Écoutes -->
    <p class="ecoutes" :class="{ visible: infosVisible }">
      {{ morceau.acf.nombreEcoute }} écoutes sur Spotify
    </p>

<iframe style="border-radius:12px" v-if="morceau.acf.spotifyid" :src="morceau.acf.spotifyid" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

    <!-- Paroles -->
    <div class="paroles">
      <button @click="afficherParoles = !afficherParoles" class="toggle-lyrics">
        {{ afficherParoles ? 'Masquer les paroles' : 'Afficher les paroles' }}
      </button>
     <div class="paroles-wrapper" :class="{ visible: afficherParoles }">
  <pre class="lyrics">
    {{ morceau.acf.lyrics }}
  </pre>
</div>
    </div>
  <!-- V2 -->
  <a v-if="morceau.acf.lien" :href="morceau.acf.lien" class="spotify-logo" target="_blank" rel="noopener">
    <img src="../assets/Spotify.png"/>
  </a>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const morceau = ref(null);
    const afficherParoles = ref(false);
    const imageVisible = ref(false);
    const infosVisible = ref(false);

    onMounted(() => {
      fetch(`https://sae401-25.mmi-stdie.fr/ugom/wp-json/vald/v1/morceaux/${route.params.id}`)
        .then(res => res.json())
        .then(data => {
          morceau.value = data;
          setTimeout(() => {
            imageVisible.value = true;
            infosVisible.value = true;
          }, 50);
        });
    });

    const retour = () => {
      router.back();
    };

    return { morceau, afficherParoles, retour, imageVisible, infosVisible };
  }
};


</script>

<style scoped>
@import'../../css/main.css';
</style>