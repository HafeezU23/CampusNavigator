import React from 'react'

const MainSection = () => {
  return (
    <div className='max-h-screen bg-[#1D1A1C] m-3'>
         <div className="p-6 rounded-lg shadow-md text-white">
         <h1 className="mb-3 text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
             How This Campus Navigator Works
        </h1>

      <div className="space-y-4">
        <section className='border-2 border-[#9000A2] p-2 rounded-lg bg-gradient-to-bl from-blue-500 to-purple-500'>
          <h3 className="text-xl font-semibold mb-2">Backend: Finding the Shortest Path with Dijkstra’s Algorithm</h3>
          <p>
            The backend of this app is powered by Python using Flask. When you select a source and destination
            on the interface and click "Navigate", a request is sent to the backend.
          </p>
          <p>
            Inside <code>app.py</code>, Dijkstra's algorithm calculates the shortest path between those two points using a graph
            representation of the campus. This graph contains all buildings and their distances (in steps).
          </p>
          <p>
            Once the shortest path is found, the backend sends the path and the total number of steps back to the frontend
            in JSON format.
          </p>
        </section>

        <section className='border-2 border-[#9000A2] p-2 rounded-lg bg-gradient-to-bl from-purple-500 to-pink-500 '>
          <h3 className="text-xl font-semibold mb-2">Communication Between Frontend and Backend</h3>
          <p>
            The frontend sends a POST request using <code>fetch()</code> with the selected source and destination.
            Flask processes the request, computes the result, and sends back:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>The shortest path (as a list of building names)</li>
            <li>The total steps it takes</li>
          </ul>
          <p>
            This data is used by the React app to update the navigation path on screen.
          </p>
        </section>

        <section className='border-2 border-[#9000A2] p-2 rounded-lg bg-gradient-to-bl from-pink-500 to-[#725cd1] '>
          <h3 className="text-xl font-semibold mb-2">Frontend Visualization with React Flow</h3>
          <p>
            The frontend uses <strong>React Flow</strong> (inside <code>Navigator.jsx</code>) to show a live map of the campus.
            Each building is a node, and connections are edges.
          </p>
          <p>
            After getting the shortest path from the backend, the app:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Highlights the selected source and destination nodes</li>
            <li>Highlights the edges between them that form the shortest path</li>
            <li>Shows a summary of the path and total steps</li>
          </ul>
          <p>
            React Flow helps display everything interactively so users can visually follow the best route.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default MainSection