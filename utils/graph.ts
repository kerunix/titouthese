import type { ForceGraph3DInstance } from '3d-force-graph'
import ForceGraph3D from '3d-force-graph'

export interface GraphNode {
  x: number
  y: number
  z: number
  cellParent: number | null
  color: string
  cellTitle: string
}

interface GraphLink { source: number, target: number }

export interface Position {
  x: number;
  y: number;
  z: number;
}

const GRAPH_DATA = [
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
  { id: 47, cellParent: 15, cellTitle: "Les Maîtres", }
] as const

export const calculateNodeValue = (node: GraphNode): number => 100 / (node.cellParent || .3) * 6

export const zoomToNode = (node: GraphNode, graph: ForceGraph3DInstance): void => {
  // Aim at node from inside the graph
  const distance = 50;
  const distRatio = 1 + distance / -(Math.hypot(node.x, node.y, node.z));

  const newPos = node.x || node.y || node.z
    ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
    : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

  graph.cameraPosition(
    newPos,
    node as Position, // lookAt ({ x, y, z })
    2000  // ms transition duration
  )
}

export const getNodeLabelContent = (node: GraphNode): string => {
  const style = `
    color: ${node.color};
    background-color: black;
    padding: 12px;
    font-weight: bold;
    border-radius: 12px; border-width: 2px; border-style: solid; border-color: ${node.color};
  `
  return `<div style="${style}">${node.cellTitle}</div>`
}

export const initGraph = () => {
  const graph: ForceGraph3DInstance = ForceGraph3D({ controlType: 'orbit' })
    .backgroundColor('#101020')
    .linkColor(() => 'rgba(255,255,255,0.2)')
    .nodeRelSize(1)
    .nodeOpacity(1)
    .linkDirectionalParticles(4)
    .linkDirectionalParticleWidth(1)
    .linkDirectionalParticleSpeed(0.001)
    .linkWidth(1)
    .linkOpacity(1)
    .nodeOpacity(1)
    .nodeResolution(20)
    .backgroundColor('#2d123e')
    .nodeAutoColorBy('cellParent')
    .nodeVal(node => calculateNodeValue(node as GraphNode))
    .nodeLabel(node => getNodeLabelContent(node as GraphNode))
    .onNodeClick(node => zoomToNode(node as GraphNode, graph))
    .nodeThreeObjectExtend(true)

  return graph
}

export const getGraphData = () => {
  let links: GraphLink[] = []
  let nodes: Partial<GraphNode>[] = []

  GRAPH_DATA.forEach(node => {
    nodes.push(node)
    if (node.cellParent) {
      links.push({ source: node.cellParent, target: node.id })
    }
  })

  return { links, nodes }
}