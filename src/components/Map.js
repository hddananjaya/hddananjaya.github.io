import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


class Node {
    constructor(x, y, g = 0, h = 0) {
      this.x = x;
      this.y = y;
      this.g = g; // Cost from start node
      this.h = h; // Heuristic cost to end node
      this.f = g + h; // Total cost
      this.parent = null; // Parent node for path tracking
    }
  }
  
  // Heuristic function: Manhattan distance
  const heuristic = (node, end) => Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
  
  function aStar(start, end, grid) {
    const openSet = [];
    const closedSet = new Set();
  
    openSet.push(start);
  
    while (openSet.length > 0) {
      // Get node with lowest f-cost
      let current = openSet.reduce((prev, node) => (node.f < prev.f ? node : prev));
      
      // Check if we reached the end
      if (current.x === end.x && current.y === end.y) {
        const path = [];
        while (current) {
          path.push(current);
          current = current.parent;
        }
        return path.reverse(); // Path from start to end
      }
  
      // Move curren    
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.add(`${current.x},${current.y}`);
  
      // Define neighbors (4 directions)
      const neighbors = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
      ].map(dir => new Node(current.x + dir.x, current.y + dir.y));
  
      for (let neighbor of neighbors) {
        // Skip if neighbor is out of bounds or already processed
        if (
          neighbor.x < 0 || neighbor.y < 0 || 
          neighbor.x >= grid[0].length || neighbor.y >= grid.length || 
          closedSet.has(`${neighbor.x},${neighbor.y}`)
        ) continue;
  
        // Calculate new g, h, and f values
        neighbor.g = current.g + 1; // Assuming equal cost for all moves
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
  
        // If neighbor is in openSet with a lower f-cost, skip it
        const existing = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
        if (existing && existing.f < neighbor.f) continue;
  
        // Set current as the parent of neighbor and add it to the openSet
        neighbor.parent = current;
        openSet.push(neighbor);
      }
    }
  
    return []; // No path found
  }

  // Define grid size
const GRID_SIZE = 10;

// Create a 2D grid array
const createGrid = (size) => {
  const grid = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push(new Node(x, y)); // Each cell is a Node instance
    }
    grid.push(row);
  }
  return grid;
};

const grid = createGrid(GRID_SIZE);
  

const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const gridSize = 10; // Grid resolution
  const start = new Node(0, 0);
  const end = new Node(gridSize - 1, gridSize - 1);

  useEffect(() => {
    // Initialize Mapbox map
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128],
      zoom: 12,
    });
    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  const runPathfinding = async () => {
    console.log('Running pathfinding...');
    const path = aStar(start, end, grid); // Run A* algorithm
    console.log('Path found:', path);
    for (let node of path) {
      // For each node in the path, add to the map
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay for animation effect

      map.addLayer({
        id: `node-${node.x}-${node.y}`,
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: nodeToLngLat(node),
            },
          },
        },
        paint: {
          'circle-radius': 6,
          'circle-color': '#ff5733', // Custom color for path nodes
        },
      });
    }
  };

  // Helper function to convert grid nodes to coordinates (simple scaling for demo)
  const nodeToLngLat = node => {
    const lng = -74.006 + (node.x * 0.01);
    const lat = 40.7128 + (node.y * 0.01);
    return [lng, lat];
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />
      <button onClick={runPathfinding}>Run Pathfinding</button>
    </div>
  );
};

export default Map;
