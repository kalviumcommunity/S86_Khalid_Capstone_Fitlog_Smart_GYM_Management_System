function WorkoutPlan() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">Workout Plans</h2>
      <ul className="list-disc list-inside">
        <li>Push Day: Chest, Shoulders, Triceps</li>
        <li>Pull Day: Back, Biceps</li>
        <li>Leg Day: Quads, Hamstrings, Calves</li>
      </ul>
    </div>
  );
}

export default WorkoutPlan;
