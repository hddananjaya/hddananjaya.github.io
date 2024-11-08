import cn from "@/utils/cn";
import { useState, useEffect } from "react";

console.log("INIT");

type Node = {
  x: number;
  y: number;
};

type DistanceMapEntry = {
  cost: number;
  paths?: Node[];
};

const GRID_SIZE = 20;

let visited: string[] = [];

const Algo = () => {
  const [shortedPath, setShortedPath] = useState<string[]>([]);
  const [walls, setWalls] = useState<Node[]>([]);
  const [startNode, setStartNode] = useState<Node>({ x: 0, y: 0 });
  const [endNode, setEndNode] = useState<Node>({ x: 0, y: 0 });
  const [doneFinding, setDoneFinding] = useState(false);
  const [execTime, setExecTime] = useState(0);

  const isOnWall = (node: Node) => {
    return walls.map((w) => `${w.x},${w.y}`).includes(`${node.x},${node.y}`);
  };

  const getNeighbours = (node: Node) => {
    const { x, y } = node;
    const neighbours: Node[] = [];
    if (x > 0 && !isOnWall({ x: x - 1, y })) neighbours.push({ x: x - 1, y });
    if (x < GRID_SIZE - 1 && !isOnWall({ x: x + 1, y }))
      neighbours.push({ x: x + 1, y });
    if (y > 0 && !isOnWall({ x, y: y - 1 })) neighbours.push({ x, y: y - 1 });
    if (y < GRID_SIZE - 1 && !isOnWall({ x, y: y + 1 }))
      neighbours.push({ x, y: y + 1 });
    return neighbours;
  };

  const addWallBrick = (node: Node) => {
    setWalls((prevWalls) => [...prevWalls, node]);
  };

  // get a random node that is not a wall 
  const getRandomNode = () => {
    let node: Node = { x: 0, y: 0 };
    while (true) {
      node = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!isOnWall(node)) {
        break;
      }
    }
    return node;
  };

  const randomlySeedStartAndEnd = () => {
    setStartNode(getRandomNode());
    setEndNode(getRandomNode());
  }

  const randomlySeedWalls = () => {
    const newWalls: Node[] = [];

    // Add edge nodes
    for (let i = 0; i < GRID_SIZE; i++) {
      newWalls.push({ x: i, y: 0 });
      newWalls.push({ x: i, y: GRID_SIZE - 1 });
      newWalls.push({ x: 0, y: i });
      newWalls.push({ x: GRID_SIZE - 1, y: i });
    }

    // Add random nodes
    Array.from({ length: GRID_SIZE }, (_, i) =>
      Array.from({ length: GRID_SIZE }, (_, j) => {
        if (
          (i !== startNode.x || j !== startNode.y) &&
          (i !== endNode.x || j !== endNode.y) &&
          Math.random() < 0.1 &&
          !newWalls.some((wall) => wall.x === i && wall.y === j)
        ) {
          newWalls.push({ x: i, y: j });
        }
      })
    );

    setWalls(newWalls);
  };

  useEffect(() => {
    randomlySeedWalls();
    randomlySeedStartAndEnd();
  }, []);

  const distanceMap = new Map<string, DistanceMapEntry>();
  Array.from({ length: GRID_SIZE }, (_, i) =>
    Array.from({ length: GRID_SIZE }, (_, j) => {
      distanceMap.set(`${i},${j}`, { cost: Infinity });
    })
  );

  const getNonVisitedShortestNode = () => {
    let minDistance = Infinity;
    let minNode: Node = { x: -1, y: -1 };
    distanceMap.forEach((distance, node) => {
      if (distance.cost < minDistance && !visited.includes(node)) {
        minDistance = distance.cost;
        const [x, y] = node.split(",").map(Number);
        minNode = { x, y };
      }
    });
    return minNode;
  };

  const findShortestPath = async () => {
    if (doneFinding) {
      resetGrid();
      setDoneFinding(false);
      return;
    }

    console.log("Finding shortest path");
    const start = performance.now();

    distanceMap.set(`${startNode.x},${startNode.y}`, {
      cost: 0,
      paths: [startNode],
    });

    let currentNode = startNode;
    while (true) {
      const currentDistance =
        distanceMap.get(`${currentNode.x},${currentNode.y}`)?.cost || 0;
      const currentPath =
        distanceMap.get(`${currentNode.x},${currentNode.y}`)?.paths || [];
      const newVisited = [...visited, `${currentNode.x},${currentNode.y}`];
      visited = newVisited;
      const nearNodes = getNeighbours(currentNode);
      const newDistance = currentDistance + 1;
      nearNodes.forEach((node) => {
        const nodeDistance = distanceMap.get(`${node.x},${node.y}`)?.cost;
        if (nodeDistance !== undefined && newDistance < nodeDistance) {
          distanceMap.set(`${node.x},${node.y}`, {
            cost: newDistance,
            paths: [...currentPath, node],
          });
        }
      });
      currentNode = getNonVisitedShortestNode();

      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        break;
      }

      if (currentNode.x === -1 && currentNode.y === -1) {
        break;
      }
      setDoneFinding(true);
    }

    const pathToEnd =
      distanceMap
        .get(`${endNode.x},${endNode.y}`)
        ?.paths?.map((p) => `${p.x},${p.y}`) || [];
    setShortedPath([...pathToEnd]);
    console.log("Done finding shortest path");
    const end = performance.now();
    console.log(`Time taken with JS: ${end - start} milliseconds`);
    setExecTime(end - start);
  };

  const resetGrid = async () => {
    for (let i = 0; i < 3; i++) {
      setStartNode(getRandomNode());
      setEndNode(getRandomNode());
      setShortedPath([]);
      setWalls([]);
      visited = [];
      randomlySeedWalls();
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  return (
    <div className="">
      <div className="relative">
        <div className="absolute origin w-[100%] h-[100%] p-1  top-0">
          <div className="bg-gray-900 w-full h-full">
          </div>
        </div>
        {Array.from({ length: GRID_SIZE }, (_, i) => (
          <div key={i} className="flex">
            {Array.from({ length: GRID_SIZE }, (_, j) => {
              const isStart = i === startNode.x && j === startNode.y;
              const isEnd = i === endNode.x && j === endNode.y;
              const isPath = shortedPath.includes(`${i},${j}`);
              const isWall = walls
                .map((w) => `${w.x},${w.y}`)
                .includes(`${i},${j}`);
              const isVisited = visited.includes(`${i},${j}`);

              const { backgroundColor, transform } = ({
                backgroundColor: isStart
                  ? "green"
                  : isEnd
                    ? "red"
                    : isPath
                      ? "orange"
                      : isWall
                        ? "#1f2937" :
                        isVisited
                          ? "purple"
                          : "white",
                transform: isPath || isWall ? "scale(1.2)" : "scale(1)",
              });

              return (
                <div
                  onMouseOver={() => addWallBrick({ x: i, y: j })}
                  key={j}
                  style={{ backgroundColor, transform }}
                  className={cn(
                    "w-4 h-4 rounded m-[2px] text-xs text-gray-500 shiny-cell"
                  )}
                >
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className=" flex flex-col justify-end">
        <p className="text-xs text-gray-900 my-3 text-end w-full min-h-4">
          {
            doneFinding && (
              <>
                Execution Time: {execTime.toPrecision(3)} milliseconds
              </>
            )
          }
        </p>        <input
          className="flex-1 text-white p-2 bg-gradient-to-r from-[#4c746d] to-[#68928b] hover:from-[#43695F] hover:to-[#70817d] rounded-lg shadow-lg border border-blue-300"
          type="button"
          onClick={findShortestPath}
          value={doneFinding ? "Reset" : "Find shortest path"}
        />
      </div>
    </div>
  );
};
export default Algo;