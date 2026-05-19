import { useState, useEffect } from "react"
import axios from "axios"

export default function App() {

  const [stringCount, setStringCount] = useState("6")
  const [gauge, setGauge] = useState("")
  const [scaleLength, setScaleLength] = useState("")
  const [frequency, setFrequency] = useState("")
  const [result, setResult] = useState<number | null>(null)

const tunings: Record<string, Record<string, number>> = {
  "6": {
    E2: 82.41,
    A2: 110.00,
    D3: 146.83,
    G3: 196.00,
    B3: 246.94,
    E4: 329.63,
  },

  "7": {
    B1: 61.74,
    E2: 82.41,
    A2: 110.00,
    D3: 146.83,
    G3: 196.00,
    B3: 246.94,
    E4: 329.63,
  }
}

  const currentNotes = tunings[stringCount]

  const stringGauges: Record<string, number> = {
    ".009": 0.000099,
    ".010": 0.000120,
    ".011": 0.000145,
    ".016": 0.000317,
    ".024": 0.000550,
    ".032": 0.000980,
    ".042": 0.001580,
    ".046": 0.001900,
    ".052": 0.002430,
    ".056": 0.002834,
    ".058": 0.002641,
    ".059": 0.002555,
    ".060": 0.002466,
    ".064": 0.002170,
    ".065": 0.002105,
    ".068": 0.001925,
    ".070": 0.001816,
    ".072": 0.001716,
    ".074": 0.001623,
    ".080": 0.001387,
    ".085": 0.001229,
    ".090": 0.001096,
    ".095": 0.000984,
    ".100": 0.000888,
    ".105": 0.000806
  }

  async function calculateTension() {

    if (!gauge || !scaleLength || !frequency) {
      return
    }

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/calculate`,
        {
          unit_weight: stringGauges[gauge],
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
  }, [gauge, scaleLength, frequency, stringCount])

  useEffect(() => {
    setFrequency("")
  }, [stringCount])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          String Tension Calculator
        </h1>

        <select
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
          value={stringCount}
          onChange={(e) => setStringCount(e.target.value)}
          >
            <option value="6">6 Strings</option>
            <option value="7">7 Strings</option>
          </select>
        <select
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
          value={gauge}
          onChange={(e) => setGauge(e.target.value)}
        >

          <option value="">
            Select Gauge
          </option>

          {Object.keys(stringGauges).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}

        </select>

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
            setFrequency(currentNotes[e.target.value].toString())
          }
        >

          <option value="">
            Select a Note
          </option>

          {Object.keys(currentNotes).map((note) => (
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

        {result !== null && (
          <div className="mt-6 text-2xl font-bold">
            Tension: {result.toFixed(2)} lbs
          </div>
        )}

      </div>

    </div>
  )
}