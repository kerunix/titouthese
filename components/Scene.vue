<script lang="ts" setup>
import ForceGraph3D from '3d-force-graph'
import {forceCollide, csvParse, gray, link} from 'd3'

// @ts-ignore
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

const getData = () => ({
  "nodes": [
    { id: 1, cellParent: null, cellTitle: "Merci", },
    { id: 2, cellParent: 1, cellTitle: "Famille", },
    { id: 3, cellParent: 1, cellTitle: "Collègues", },
    { id: 4, cellParent: 1, cellTitle: "Copains", },
    { id: 5, cellParent: 1, cellTitle: "Miscellanées", },
    { id: 6, cellParent: 1, cellTitle: "Tout ce que j'ai oublié parce qu'un cerveau c'est gros mais petit aussi.", },
    { id: 7, cellParent: 1, cellTitle: "Vincent & Stéphanie", },
    { id: 8, cellParent: 2, cellTitle: "Le sang", },
    { id: 9, cellParent: 2, cellTitle: "La ClouZAD", },
    { id: 10, cellParent: 2, cellTitle: "Tribu Lafont", },
    { id: 11, cellParent: 3, cellTitle: "AMAP", },
    { id: 12, cellParent: 3, cellTitle: "ECOFOG", },
    { id: 13, cellParent: 3, cellTitle: "LEFE", },
    { id: 14, cellParent: 4, cellTitle: "La Gouyane", },
    { id: 15, cellParent: 4, cellTitle: "L'HeXaGoNe", },
    { id: 16, cellParent: 5, cellTitle: "La Musique: https://open.spotify.com/playlist/42a0UPABISE9fScrcTmZG3?si=0d42251f2b2440ca", },
    { id: 17, cellParent: 5, cellTitle: "Le Vent", },
    { id: 18, cellParent: 5, cellTitle: "George Brassens", },
    { id: 19, cellParent: 5, cellTitle: "L'eau", },
    { id: 20, cellParent: 5, cellTitle: "La lecture", },
    { id: 21, cellParent: 5, cellTitle: "L'imaginaire et la fantaisie", },
    { id: 22, cellParent: 5, cellTitle: "La tendresse", },
    { id: 23, cellParent: 8, cellTitle: "La Mama", },
    { id: 24, cellParent: 8, cellTitle: "La portée", },
    { id: 25, cellParent: 9, cellTitle: "ToulouZ Gang", },
    { id: 26, cellParent: 10, cellTitle: "Hélène", },
    { id: 27, cellParent: 10, cellTitle: "Et tout les autres bien entendu!", },
    { id: 28, cellParent: 11, cellTitle: "Céline Leroy, Incroyable Bosse", },
    { id: 29, cellParent: 11, cellTitle: "Camille Girard-Tercieux", },
    { id: 30, cellParent: 11, cellTitle: "Jeanne Clément", },
    { id: 31, cellParent: 12, cellTitle: "Valérie Troispoux", },
    { id: 32, cellParent: 12, cellTitle: "Eliane Louisanna", },
    { id: 33, cellParent: 12, cellTitle: "Sabrina Coste", },
    { id: 34, cellParent: 12, cellTitle: "Jocelyn Cazal", },
    { id: 35, cellParent: 12, cellTitle: "Les Djeuns", },
    { id: 36, cellParent: 12, cellTitle: "Tout les autres!!", },
    { id: 37, cellParent: 13, cellTitle: "Régis Céréghino, El Patron", },
    { id: 38, cellParent: 13, cellTitle: "Les doctorants", },
    { id: 39, cellParent: 13, cellTitle: "Les collocs", },
    { id: 40, cellParent: 14, cellTitle: "La Maison Jaune", },
    { id: 41, cellParent: 14, cellTitle: "El Boxeo Club Clandestino", },
    { id: 42, cellParent: 14, cellTitle: "La pirogue", },
    { id: 43, cellParent: 14, cellTitle: "Party KingZ", },
    { id: 44, cellParent: 14, cellTitle: "Le 13, incarné par MOMO", },
    { id: 45, cellParent: 14, cellTitle: "La Spez' et sa sauce", },
    { id: 46, cellParent: 15, cellTitle: "Old Gang", },
    { id: 47, cellParent: 15, cellTitle: "Les Maîtres",  }
  ],
  "links": [

  ]
})

const graphWrapper = ref<HTMLDivElement | null>(null)

const graphOptions = {
  extraRenderers: [new CSS2DRenderer()]
}

onMounted(() => {
  if (graphWrapper.value) {
    const graph = ForceGraph3D(graphOptions)
      .dagMode('radialout')
      .dagLevelDistance(200)
      .backgroundColor('#101020')
      .linkColor(() => 'rgba(255,255,255,0.2)')
      .nodeRelSize(2)
      .nodeOpacity(0.9)
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(1)
      .linkDirectionalParticleSpeed(0.006)
      // .d3Force('collision', forceCollide(node => Math.cbrt(node.size) * 1))
      // .d3VelocityDecay(0.3)
      .linkWidth(1)
      .linkOpacity(1)
      .nodeOpacity(1)
      .nodeAutoColorBy('cellParent')
      .nodeLabel(node => {
        let style = `color: ${node.color}; `
        console.log(node)
        style.concat(`background-color: ${node.color}80; `)
        style.concat(`padding: 12px; `)
        return `<div style="${style}">${node.cellTitle}</div>`
        // const nodeEl = document.createElement('div');
        // nodeEl.textContent = node.cellTitle as string | null
        // nodeEl.style.color = node.color
        // nodeEl.style.backgroundColor = `${node.color}80`
        // nodeEl.style.padding = '12px'
        // nodeEl.style.borderRadius = '12px'
        // nodeEl.style.borderWidth = '2px'
        // nodeEl.style.borderColor = node.color
        // nodeEl.style.borderStyle = 'solid'
        // nodeEl.className = 'node-label'
        // return nodeEl.toString()
      })
      // .onNodeClick(node => {
      //   // Aim at node from outside it
      //   const distance = 40;
      //   const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      //   const newPos = node.x || node.y || node.z
      //     ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
      //     : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

      //   graph.cameraPosition(
      //     newPos, // new position
      //     node, // lookAt ({ x, y, z })
      //     3000  // ms transition duration
      //   );
      // })
      .nodeThreeObjectExtend(true)

    graph.d3Force('charge').strength(-15);

    let links = []

    getData().nodes.forEach(node => {
      if (node.cellParent) {
        links.push({ source: node.cellParent, target: node.id})
      }
    })

    const { nodes } = getData()
    graph(graphWrapper.value).graphData({ nodes, links })
  }
})
</script>

<template>
<div ref="graphWrapper" />
</template>
