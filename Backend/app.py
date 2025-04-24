from flask import Flask, request, jsonify
from flask_cors import CORS
import heapq

app = Flask(__name__)
CORS(app)

graph = {
    'Library': {'Admin Block': 100, 'Cafeteria': 150, 'Room 13': 60},
    'Admin Block': {'Library': 100, 'Computer Labs': 120, 'Auditorium': 200, 'Room 1': 50},
    'Cafeteria': {'Library': 150, 'Computer Labs': 80},
    'Computer Labs': {'Admin Block': 120, 'Cafeteria': 80, 'Auditorium': 100, 'Room 13': 100},
    'Auditorium': {'Admin Block': 200, 'Computer Labs': 100},
    'Hostel': {'Computer Labs': 170},
    
    'Room 1': {'Admin Block': 50, 'Room 2': 50},
    'Room 2': {'Room 1': 50, 'Room 3': 50},
    'Room 3': {'Room 2': 50, 'Room 4': 50},
    'Room 4': {'Room 3': 50, 'Room 5': 50},
    'Room 5': {'Room 4': 50, 'Room 6': 50},
    'Room 6': {'Room 5': 50, 'Room 7': 50},
    'Room 7': {'Room 6': 50, 'Room 8': 50},
    'Room 8': {'Room 7': 50, 'Room 9': 120},
    'Room 9': {'Room 8': 120, 'Room 10': 50},
    'Room 10': {'Room 9': 50, 'Room 11': 50},
    'Room 11': {'Room 10': 50, 'Room 12': 50},
    'Room 12': {'Room 11': 50, 'Room 13': 50},
    'Room 13': {'Room 12': 50, 'Library': 60, 'Computer Labs': 100},

    'Washrooms': {'Room 9': 100}
}

def dijkstra(start, end):
    pq = [(0, start, [])]
    visited = set()

    while pq:
        (dist, current, path) = heapq.heappop(pq)
        if current in visited:
            continue
        path = path + [current]
        if current == end:
            return {'distance': dist, 'path': path}
        visited.add(current)
        for neighbor, weight in graph.get(current, {}).items():
            if neighbor not in visited:
                heapq.heappush(pq, (dist + weight, neighbor, path))

    return {'distance': 0, 'path': []}

@app.route('/shortest-path', methods=['POST'])
def shortest_path():
    data = request.get_json()
    start = data.get('start')
    end = data.get('end')

    if not start or not end or start not in graph or end not in graph:
        return jsonify({'error': 'Invalid input'}), 400

    result = dijkstra(start, end)
    if not result['path']:
        return jsonify({'error': 'No path found'}), 404

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
