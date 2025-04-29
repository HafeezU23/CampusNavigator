from flask import Flask, request, jsonify
from flask_cors import CORS
import heapq

app = Flask(__name__)
CORS(app)

graph = {
    'Main Gate': {
        'Admin Block': 25,
        'Room 1': 18,
        'Room 2': 18,
        'Basement': 90,
        'CS Department': 118,
        'Cafe': 221,
        'Cafe 2': 245,
        'Auditorium': 255
    },
    'Admin Block': {
        'Main Gate': 25,
        'Room 1': 8,
        'Room 2': 8
    },
    'Room 1': {
        'Main Gate': 18,
        'Admin Block': 8,
        'Room 2': 3,
        'Room 4': 8

    },
    'Room 2': {
        'Main Gate': 18,
        'Admin Block': 8,
        'Room 1': 3,
        'Room 3': 8
    },
    'Room 3': {
        'Room 4': 3,
        'Room 5': 12,
        'Room 2': 8,

    },
    'Room 4': {
        'Room 1': 8,
        'Room 3': 3,
        'Room 6': 12,
        
    },
    'Room 5': {
        'Room 3': 12,
         'Room 7': 8,
        'Room 6': 3
    },
    'Room 6': {
        'Room 4': 12,
        'Room 5': 3,
        'Room 8': 8
    },
    'Room 7': {
        'Room 8': 3,
        'Room 7': 8,
        'Server Room': 10,
        'Washroom': 30
    },
    'Room 8': {
        'Room 7': 3,
        'Room 9': 8,
        'Room 6':8,
        'Server Room': 10,
    },
    'Lab 9': {  # Previously Room 8
        'Room 7': 8,
        'Washroom': 30,
        'Badminton Court': 18
    },
    'Room 9': {
        'Room 8': 8,
        'Room 10': 8,
        'Computer Labs': 70,
        'Server Room': 12,
    },
    'Room 10': {
        'Room 11': 8
    },
    'Room 11': {
        'Room 10': 8,
        'Room 12': 8
    },
    'Room 12': {
        'Room 11': 8,
        'Room 13': 8
    },
    'Room 13': {
        'Room 12': 8,
        'Room 11': 8
    },
    'Room 14': {
        'Room 13': 8,
        'Room 15': 8
        
    },
    'Room 15': {
        'Room 12': 8,
        
    },
    'Room 16': {
        'Room 12': 8,
        
    },
    'Room 17': {
        'Room 12': 8,
        
    },
    'Library': {
        'Room 13': 8
    },
    'Computer Labs': {
        'Room 9': 40,
        'Main Gate': 57
    },
    'Server Room': {
        'Room 8': 10,
        'Room 7': 10,
         
        
    },
    'Badminton Court': {
        'Lab 9': 18,
        'Ground': 9,
        'Cafeteria': 36
    },
    'Play Ground': {
        'Badminton Court': 9,
        'Book Shop': 40,
        'Main Gate': 200

    },
    'Book Shop': {
        'Ground': 40,
        'Cafeteria': 40,
        'Washroom': 5
    },
    'Cafeteria': {
        'Badminton Court': 36,
        'Ground': 36,
        'Book Shop': 40,
        'Auditorium': 36,

    },
    'Washroom': {
        'Book Shop': 5,
        
    },
    'Wash Area': {
        'Washroom': 30
    },
    'Basement': {
        'Main Gate': 90
    },
    'CS Department': {
        'Main Gate': 118
    },
    'Cafe': {
        'Main Gate': 221
    },
   
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