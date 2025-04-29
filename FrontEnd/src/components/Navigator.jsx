
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const buildings = [
  "Admin Block", "Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6",
  "Room 7", "Room 8", "Room 9", "Room 10", "Room 11", "Room 12", "Room 13",
  "Computer Labs", "Server Room", "Auditorium", "Washroom", "Main Gate", "Play Ground"
];

const buildingPositions = {
  "Admin Block": { x: 100, y: 100 },
  "Room 1": { x: 200, y: 100 },
  "Room 2": { x: 300, y: 100 },
  "Room 3": { x: 400, y: 100 },
  "Room 4": { x: 500, y: 100 },
  "Room 5": { x: 600, y: 100 },
  "Room 6": { x: 700, y: 100 },
  "Room 7": { x: 800, y: 100 },
  "Room 8": { x: 900, y: 100 },
  "Room 9": { x: 100, y: 200 },
  "Room 10": { x: 200, y: 200 },
  "Room 11": { x: 300, y: 200 },
  "Room 12": { x: 400, y: 200 },
  "Room 13": { x: 500, y: 200 },
  "Computer Labs": { x: 200, y: 300 },
  "Auditorium": { x: 400, y: 300 },
  "Server Room": { x: 500, y: 300 },
  "Washroom": { x: 600, y: 300 },
  "Main Gate": { x: 200, y: 400 },
  "Play Ground": { x: 300, y: 400 },
};

export default function Navigator() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const allNodes = Object.entries(buildingPositions).map(([name, pos]) => ({
      id: name,
      data: { label: name },
      position: pos,
      style: {
        width: 80,
        height: 80,
        borderRadius: 0,
        border: '2px solid #aaa',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }));
    setNodes(allNodes);
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/shortest-path', {
        start,
        end,
      });

      setResult(res.data);
      setError('');

      console.log('Backend path:', res.data.path); // Debug
      const pathEdges = res.data.path.slice(0, -1).map((node, i) => ({
        id: `${node}-${res.data.path[i + 1]}`,
        source: node,
        target: res.data.path[i + 1],
        type: 'default',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: {
          stroke: '#3b82f6',
          strokeWidth: 3,
        },
      }));

      setEdges(pathEdges);
    } catch (err) {
      console.error(err);
      setError('No path found');
      setResult(null);
      setEdges([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1A1C] py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Campus Path Navigator
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">From</label>
            <select
              onChange={(e) => setStart(e.target.value)}
              value={start}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {buildings.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">To</label>
            <select
              onChange={(e) => setEnd(e.target.value)}
              value={end}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {buildings.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Find Shortest Path
        </button>

        {result && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-green-700">
              Path: {result.path.join(' ➝ ')}
            </p>
            <p className="text-md">Distance: {result.distance} steps</p>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>

      {nodes.length > 0 && (
        <div className="mt-10 h-[400px] bg-white rounded-xl shadow overflow-hidden">
          <ReactFlow
            key={`${start}-${end}`} // Forces re-render
            nodes={nodes}
            edges={edges}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}
