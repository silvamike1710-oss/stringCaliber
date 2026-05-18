import { useState, useEffect } from "react"
import axios from "axios"

export default function App() {

  const [unitWeight, setUnitWeight] = useState("")
  const [scaleLength, setScaleLength] = useState("")
  const [frequency, setFrequency] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const notes: Record<string, number> = {
    E2: 82.41,
    A2: 110.00,
    D3: 146.83,
    G3: 196.00,
    B3: 246.94,
    E4: 329.63,
  }

  async function calculateTension() {

    if (!unitWeight || !scaleLength || !frequency) {
      return
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/calculate",
        {
          unit_weight: Number(unitWeight),
          scale_length: Number(scaleLength),
          frequency: Number(frequency)
        }
      )

      setResult(response.data.tension)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    calculateTension()
  }, [unitWeight, scaleLength, frequency])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          String Tension Calculator
        </h1>

        <input
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
          type="number"
          placeholder="Unit Weight"
          value={unitWeight}
          onChange={(e) => setUnitWeight(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
          type="number"
          placeholder="Scale Length"
          value={scaleLength}
          onChange={(e) => setScaleLength(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
          onChange={(e) =>
            setFrequency(notes[e.target.value].toString())
          }
        >

          <option value="">
            Select a note
          </option>

          {Object.keys(notes).map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}

        </select>

        <input
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
          type="number"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />

        <button
          onClick={calculateTension}
          className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-500 transition"
        >
          Calculate
        </button>

        {
          result !== null && (
            <div className="mt-6 text-2xl font-bold">
              Tension: {result} lbs
            </div>
          )
        }

      </div>

    </div>
  )
}