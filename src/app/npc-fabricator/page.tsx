export default function NPCFab() {
    return (
        <main>
            <h1 className="text-6xl">NPC Fabricator</h1>
            <h2 className="text-3xl">Statblock</h2>
            <h2 className="text-3xl">Character Card</h2>
            <section className="w/12 inline-block p-4">
                <form>
                    <label htmlFor="npc-name">Name</label> <br/>
                    <input type="text" name="npc-name" className="bg-inherit"></input> <br/>

                    <label>Type</label> <br/>
                    <input type="text" name="npc-type" className="bg-inherit"></input> <br/>

                    <label htmlFor="npc-alignment">Alignment</label> <br/>
                    <select name="npc-alignment" defaultValue="N" className="bg-inherit">
                        <option value="CG" className="text-black">Chaotic Good</option>
                        <option value="LG" className="text-black">Lawful Good</option>
                        <option value="NG" className="text-black">Neutral Good</option>
                        <option value="CN" className="text-black">Chaotic Neutral</option>
                        <option value="LN" className="text-black">Lawful Neutral</option>
                        <option value="N" className="text-black">True Neutral</option>
                        <option value="CE" className="text-black">Chaotic Evil</option>
                        <option value="LE" className="text-black">Lawful Evil</option>
                        <option value="NE" className="text-black">Neutral Evil</option>
                    </select> <br/>
                    <label htmlFor="npc-size">Size</label> <br/>
                    <select name="npc-size" defaultValue="M" className="bg-inherit">
                        <option value="T" className="text-black">Tiny</option>
                        <option value="S" className="text-black">Small</option>
                        <option value="M" className="text-black">Medium</option>
                        <option value="L" className="text-black">Large</option>
                        <option value="H" className="text-black">Huge</option>
                        <option value="G" className="text-black">Gargantuan</option>
                    </select> <br/>

                    <label>Armor Class</label> <br/>
                    <input type="number" name="npc-ac" className="bg-inherit"></input> <br/>
                    <label>Hit Points</label> <br/>
                    <label>Challenge Rating</label> <br/>
                    <input type="number" min="1" max="30" className="bg-inherit"></input> <br/>
                    <table className="border-2">
                        <tr>
                            <th className="border-2">STR</th>
                            <th className="border-2">DEX</th>
                            <th className="border-2">CON</th>
                            <th className="border-2">INT</th>
                            <th className="border-2">WIS</th>
                            <th className="border-2">CHA</th>
                        </tr>
                        <tr>
                            <th><input type="number" min="1" max="40" name="STR" className="bg-inherit border-2"></input></th>
                            <th><input type="number" min="1" max="40" name="DEX" className="bg-inherit border-2"></input></th>
                            <th><input type="number" min="1" max="40" name="CON" className="bg-inherit border-2"></input></th>
                            <th><input type="number" min="1" max="40" name="INT" className="bg-inherit border-2"></input></th>
                            <th><input type="number" min="1" max="40" name="WIS" className="bg-inherit border-2"></input></th>
                            <th><input type="number" min="1" max="40" name="CHA" className="bg-inherit border-2"></input></th>
                        </tr>
                    </table>
                    <label>Saving Throws</label> <br/>
                    <label>Skills</label> <br/>
                    <label>Damage Resistances</label> <br/>
                    <label>Damage Immunities</label> <br/>
                    <label>Condition Immunities</label> <br/>
                    <label>Senses</label> <br/>
                    <label>Languages</label> <br/>
                    <label>Challenge Rating</label> <br/>
                    <label>Traits</label> <br/>
                    <label>Actions</label> <br/>
                    <label>Reactions</label> <br/>
                    <label>Legendary Actions</label> <br/>
                    <label>Lair Actions</label> <br/>
                    <label>Mythic Actions</label> <br/>
                </form>
            </section>
        </main>
    );
}