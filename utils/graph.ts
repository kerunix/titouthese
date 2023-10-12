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
  { id: 47, cellParent: 15, cellTitle: "Les Maîtres", },
  { id:48, cellParent: 47, cellTitle: "Paul Castagneh", },
  { id:49, cellParent: 134, cellTitle: "Garance", },
  { id:50, cellParent: 47, cellTitle: "CM1B", },
  { id:51, cellParent: 50, cellTitle: "Castex", },
  { id:52, cellParent: 47, cellTitle: "Sophaïe", },
  { id:53, cellParent: 46, cellTitle: "Oliver", },
  { id:54, cellParent: 46, cellTitle: "Gregolri", },
  { id:55, cellParent: 24, cellTitle: "Dr. Bapt", },
  { id:56, cellParent: 24, cellTitle: "Pedro", },
  { id:57, cellParent: 24, cellTitle: "Plopinounez", },
  { id:58, cellParent: 24, cellTitle: "Jude Da Funk", },
  { id:59, cellParent: 9, cellTitle: "Puelo ", },
  { id:60, cellParent: 9, cellTitle: "Mouyouva", },
  { id:61, cellParent: 40, cellTitle: "Melune", },
  { id:62, cellParent: 35, cellTitle: "Xelou", },
  { id:63, cellParent: 40, cellTitle: "Ilono Clacher", },
  { id:64, cellParent: 14, cellTitle: "Tibo", },
  { id:65, cellParent: 136, cellTitle: "NicoThé", },
  { id:66, cellParent: 9, cellTitle: "Tibal", },
  { id:67, cellParent: 9, cellTitle: "Hougo", },
  { id:68, cellParent: 9, cellTitle: "Grobiche", },
  { id:69, cellParent: 9, cellTitle: "Delou", },
  { id:70, cellParent: 134, cellTitle: "Pline", },
  { id:71, cellParent: 134, cellTitle: "L'Inspecteur Vert et l'Agent Renard (et Dr. Cranienne)", },
  { id:72, cellParent: 41, cellTitle: "Seb", },
  { id:73, cellParent: 41, cellTitle: "One PunchGuy", },
  { id:74, cellParent: 41, cellTitle: "HumberDog", },
  { id:75, cellParent: 41, cellTitle: "Camille", },
  { id:76, cellParent: 41, cellTitle: "Le Kiné", },
  { id:77, cellParent: 136, cellTitle: "La Flav", },
  { id:78, cellParent: 40, cellTitle: "Robin et Diane", },
  { id:79, cellParent: 8, cellTitle: "Belou le Musclé", },
  { id:80, cellParent: 82, cellTitle: "Cams ", },
  { id:81, cellParent: 82, cellTitle: "Stephou", },
  { id:82, cellParent: 15, cellTitle: "Le gang de José", },
  { id:83, cellParent: 42, cellTitle: "Les FAYA BOTO", },
  { id:84, cellParent: 42, cellTitle: "Les FEUFEUFEU", },
  { id:85, cellParent: 84, cellTitle: "Papy", },
  { id:86, cellParent: 84, cellTitle: "Guylaine", },
  { id:87, cellParent: 84, cellTitle: "Tonton, captain' Président à vie", },
  { id:88, cellParent: 84, cellTitle: "Celia", },
  { id:89, cellParent: 84, cellTitle: "Marine", },
  { id:90, cellParent: 84, cellTitle: "Kiki", },
  { id:91, cellParent: 84, cellTitle: "Flo", },
  { id:92, cellParent: 84, cellTitle: "Antonin", },
  { id:93, cellParent: 84, cellTitle: "Morgan ce gros chiant", },
  { id:94, cellParent: 84, cellTitle: "Aymeric", },
  { id:95, cellParent: 35, cellTitle: "Lily WOLTAHH", },
  { id:96, cellParent: 12, cellTitle: "Mes collègues stagiaires", },
  { id:97, cellParent: 96, cellTitle: "Nathaguy", },
  { id:98, cellParent: 96, cellTitle: "Melody", },
  { id:99, cellParent: 96, cellTitle: "Youstiyoust", },
  { id:100, cellParent:	12, cellTitle: "Les enfants", },
  { id:101, cellParent:	100, cellTitle: "Le FTH", },
  { id:102, cellParent:	100, cellTitle: "Le master", },
  { id:103, cellParent:	100, cellTitle: "Les stagiaires", },
  { id:104, cellParent:	15, cellTitle: "Les Scouts", },
  { id:105, cellParent:	104, cellTitle: "Phipo", },
  { id:106, cellParent:	104, cellTitle: "Phugues", },
  { id:107, cellParent: 104, cellTitle: "JG", },
  { id:108, cellParent:	104, cellTitle: "Tintin", },
  { id:109, cellParent:	104, cellTitle: "Gus", },
  { id:110, cellParent:	104, cellTitle: "LM", },
  { id:111, cellParent:	104, cellTitle: "Alexis", },
  { id:112, cellParent:	104, cellTitle: "The Gaud", },
  { id:113, cellParent:	104, cellTitle: "Le Loup", },
  { id:114, cellParent:	104, cellTitle: "Le Lynx", },
  { id:115, cellParent:	104, cellTitle: "L'épervier", },
  { id:116, cellParent:	104, cellTitle: "Renard & Aigle parce que je suis réglo", },
  { id:117, cellParent:	134, cellTitle: "Clémont", },
  { id:118, cellParent:	35, cellTitle: "Sylvain", },
  { id:119, cellParent:	35, cellTitle: "Vincyane", },
  { id:120, cellParent:	35, cellTitle: "PhdPal", },
  { id:121, cellParent:	35, cellTitle: "La salze", },
  { id:122, cellParent:	35, cellTitle: "Gradoz", },
  { id:123, cellParent:	35, cellTitle: "Dany", },
  { id:124, cellParent:	35, cellTitle: "Warren", },
  { id:125, cellParent:	35, cellTitle: "Thomas", },
  { id:126, cellParent:	130, cellTitle: "Mariloche", },
  { id:127, cellParent:	130, cellTitle: "Marie", },
  { id:128, cellParent:	12, cellTitle: "Olane", },
  { id:129, cellParent:	12, cellTitle: "Amicelda", },
  { id:130, cellParent:	35, cellTitle: "L'akwaryoume", },
  { id:131, cellParent:	136, cellTitle: "Bruno Corbara", },
  { id:132, cellParent:	136, cellTitle: "Jean-François Carrias", },
  { id:133, cellParent:	134, cellTitle: "Lou", },
  { id:134, cellParent:	15, cellTitle: "Extra", },
  { id:135, cellParent:	47, cellTitle: "La Goute", },
  { id:136, cellParent:	14, cellTitle: "Extra", },
  { id:137, cellParent: 134, cellTitle: "Emiliano", },
  { id:138, cellParent: 14, cellTitle: "Camille Bonhomme", },
  { id:139, cellParent: 147, cellTitle: "StackOverflow", },
  { id:140, cellParent: 147, cellTitle: "StackExchange", },
  { id:141, cellParent: 147, cellTitle: "CrossValidated", },
  { id:142, cellParent: 136, cellTitle: "Micha", }, 
  { id:143, cellParent: 136, cellTitle: "HIIT", }, 
  { id:144, cellParent: 136, cellTitle: "Faya Patrice", },
  { id:145, cellParent: 12, cellTitle: "Benoit Burban", },
  { id:146, cellParent: 12, cellTitle: "Jean-Yves Goret", },
  { id:147, cellParent: 3, cellTitle: "Unknown contributors"},
  { id:148, cellParent: 3, cellTitle: "Les membres de mon comité de thèse"},
  { id:149, cellParent: 148, cellTitle: "Jean-François Carrias"},
  { id:150, cellParent: 148, cellTitle: "Frédéric Delsuc"},
  { id:151, cellParent: 148, cellTitle: "Laurence Gaume-Vial"},
  { id:152, cellParent: 148, cellTitle: "Heidy Schimann"},
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