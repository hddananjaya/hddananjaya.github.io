#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <unordered_map>

struct Node {
    int x;
    int y;
};

struct DistanceMapEntry {
    double cost;
    std::vector<Node> paths;
};

const int GRID_SIZE = 20;
const Node START_NODE = { 2, 2 };
const Node END_NODE = { GRID_SIZE - 2, GRID_SIZE - 3 };

std::vector<Node> walls;
std::unordered_map<std::string, DistanceMapEntry> distanceMap;
std::vector<std::string> visited;


bool isOnWall(const Node& node) {
    for (const auto& wall : walls) {
        if (wall.x == node.x && wall.y == node.y) {
            return true;
        }
    }
    return false;
}

std::vector<Node> getNeighbours(const Node& node) {
    std::vector<Node> neighbours;
    int x = node.x;
    int y = node.y;

    if (x > 0 && !isOnWall({ x - 1, y })) {
        neighbours.push_back({ x - 1, y });
    }
    if (x < GRID_SIZE - 1 && !isOnWall({ x + 1, y })) {
        neighbours.push_back({ x + 1, y });
    }
    if (y > 0 && !isOnWall({ x, y - 1 })) {
        neighbours.push_back({ x, y - 1 });
    }
    if (y < GRID_SIZE - 1 && !isOnWall({ x, y + 1 })) {
        neighbours.push_back({ x, y + 1 });
    }

    return neighbours;
}

Node getNonVisitedShortestNode() {
    double minDistance = std::numeric_limits<double>::infinity();
    Node minNode = { -1, -1 };

    for (const auto& entry : distanceMap) {
        const std::string& node = entry.first;
        const DistanceMapEntry& distance = entry.second;

        if (distance.cost < minDistance && std::find(visited.begin(), visited.end(), node) == visited.end()) {
            minDistance = distance.cost;
            size_t commaPos = node.find(',');
            int x = std::stoi(node.substr(0, commaPos));
            int y = std::stoi(node.substr(commaPos + 1));
            minNode = { x, y };
        }
    }

    return minNode;
}

extern "C" {
    int calc_walls() {
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }
    
    void randomlySeedWalls() {
        std::vector<Node> newWalls;
        std::srand(std::time(0)); // Seed for random number generation

        for (int i = 0; i < GRID_SIZE; ++i) {
            for (int j = 0; j < GRID_SIZE; ++j) {
                if ((i != START_NODE.x || j != START_NODE.y) &&
                    (i != END_NODE.x || j != END_NODE.y) &&
                    (std::rand() % 100 < 10)) { // 10% chance
                    newWalls.push_back({ i, j });
                }
            }
        }

        walls = newWalls;
        std::cout << "Generated walls. Size: " << walls.size() << std::endl;
    }

    void initializeDistanceMap() {
        for (int i = 0; i < GRID_SIZE; ++i) {
            for (int j = 0; j < GRID_SIZE; ++j) {
                std::string key = std::to_string(i) + "," + std::to_string(j);
                distanceMap[key] = { std::numeric_limits<double>::infinity(), {} };
            }
        }
        std::cout << "Initialized distance map." << std::endl;
    }

    const char* findShortestPath() {
        std::cout << "Finding shortest path" << std::endl;
    
        distanceMap[std::to_string(START_NODE.x) + "," + std::to_string(START_NODE.y)] = { 0, { START_NODE } };
    
        Node currentNode = START_NODE;
        while (true) {
            double currentDistance = distanceMap[std::to_string(currentNode.x) + "," + std::to_string(currentNode.y)].cost;
            std::vector<Node> currentPath = distanceMap[std::to_string(currentNode.x) + "," + std::to_string(currentNode.y)].paths;
            visited.push_back(std::to_string(currentNode.x) + "," + std::to_string(currentNode.y));
            std::vector<Node> nearNodes = getNeighbours(currentNode);
            double newDistance = currentDistance + 1;
            for (const auto& node : nearNodes) {
                std::string nodeKey = std::to_string(node.x) + "," + std::to_string(node.y);
                double nodeDistance = distanceMap[nodeKey].cost;
                if (newDistance < nodeDistance) {
                    distanceMap[nodeKey] = { newDistance, currentPath };
                    distanceMap[nodeKey].paths.push_back(node);
                }
            }
            currentNode = getNonVisitedShortestNode();
    
            if (currentNode.x == -1 && currentNode.y == -1) {
                break;
            }
        }
    
        std::vector<std::string> pathToEnd;
        std::string endNodeKey = std::to_string(END_NODE.x) + "," + std::to_string(END_NODE.y);
        for (const auto& p : distanceMap[endNodeKey].paths) {
            pathToEnd.push_back(std::to_string(p.x) + "," + std::to_string(p.y));
        }
        std::cout << "Done finding shortest path" << std::endl;
        std::cout << "Path size: " << pathToEnd.size() << std::endl;
    
        // Concatenate pathToEnd with "-"
        static std::string pathString;
        for (size_t i = 0; i < pathToEnd.size(); ++i) {
            pathString += pathToEnd[i];
            if (i < pathToEnd.size() - 1) {
                pathString += "-";
            }
        }
    
        return pathString.c_str();
    }
}