export default function Home() {
  return (
    <main>
      <h1 className="text-4xl text-center">What is thy bidding, my master?</h1>

      <section className="w-1/2 m-auto">
        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">NPC Fabricator</h2>
          <sub>Are you going to build a friend, or foe?</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Blacksmith</h2>
          <sub>What will you craft?</sub>
        </div>
        
        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Alamanac</h2>
          <sub>A book of all your creations</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Dice Roller</h2>
          <sub>Roll all the dice</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Initiative Tracker</h2>
          <sub>Keep track of turns</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Encounter Calculator</h2>
          <sub>Check if your boss is gonna kill them</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Generators</h2>
          <sub>You have been given inspiration</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Experience Tracker</h2>
          <sub>Master, thy rations are ready for you.</sub>
        </div>

        <div className="gallery-item inline-block p-4">
          <h2 className="text-2xl text-center">Notes</h2>
          <sub>Your study, master.</sub>
        </div>
      </section>
    </main>
  );
}
