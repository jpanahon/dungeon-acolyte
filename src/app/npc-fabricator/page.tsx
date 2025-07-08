export default function NPCFab() {
    let stats = [
        {name: "STR", score: 10, mod: 0},
        {name: "DEX", score: 10, mod: 0},
        {name: "CON", score: 10, mod: 0},
        {name: "INT", score: 10, mod: 0},
        {name: "WIS", score: 10, mod: 0},
        {name: "CHA", score: 10, mod: 0}
    ];

    let savingThrows = stats;

    let skills = [
        {id: "ATH", name: "Athletics", mod: 0},
        {id: "ANH", name: "Animal Handling", mod: 0},
        {id: "ACB", name: "Acrobatics", mod: 0},
        {id: "ARC", name: "Arcana", mod: 0},
        {id: "DEC", name: "Deception", mod: 0},
        {id: "HIS", name: "History", mod: 0},
        {id: "INS", name: "Insight", mod: 0},
        {id: "INT", name: "Intimidation", mod: 0},
        {id: "INV", name: "Investigation", mod: 0},
        {id: "MED", name: "Medicine", mod: 0},
        {id: "NAT", name: "Nature", mod: 0},
        {id: "PRC", name: "Perception", mod: 0},
        {id: "PRF", name: "Performance", mod: 0},
        {id: "PRS", name: "Persuasion", mod: 0},
        {id: "REL", name: "Religion", mod: 0},
        {id: "SOH", name: "Sleight of Hand", mod: 0},
        {id: "SUR", name: "Survival", mod: 0},
    ];

    const damageTypes = ["Acid", "Bludgeoning", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Piercing", "Poison", 
                         "Psychic", "Radiant", "Slashing", "Thunder"];

    const conditions = ["Blinded", "Charmed", "Deafened", "Frightened", "Grappled", "Incapacitated", "Paralyzed", 
                        "Petrified", "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious"]

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
                    </select> <br/> <br/>

                    <label htmlFor="npc-size">Size</label> <br/>
                    <select name="npc-size" defaultValue="M" className="bg-inherit">
                        <option value="T" className="text-black">Tiny</option>
                        <option value="S" className="text-black">Small</option>
                        <option value="M" className="text-black">Medium</option>
                        <option value="L" className="text-black">Large</option>
                        <option value="H" className="text-black">Huge</option>
                        <option value="G" className="text-black">Gargantuan</option>
                    </select> <br/> <br/>

                    <label>Armor Class</label> <br/>
                    <input type="number" name="npc-ac" className="bg-inherit"></input> <br/>
                    <label>Hit Points</label> <br/>
                    <label>Speed</label> <br/>
                    <label>Challenge Rating</label> <br/>
                    <input type="number" min="1" max="30" className="bg-inherit"></input> <br/>
                    
                    <table className="border-2 bg-inherit">
                        <tbody>
                            <tr>
                                {
                                    stats.map((stat) => (
                                        <th key={stat.name} className="border-2">{stat.name}</th>
                                    ))
                                }
                            </tr>
                            
                            <tr>
                                {
                                    stats.map((stat) => (
                                        <th key={stat.name}>
                                            <input type="number" min="1" max="40" name={stat.name} 
                                                   defaultValue={stat.score} className="bg-inherit border-2">
                                            </input>
                                        </th>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>

                    <label>Saving Throws</label> <br/>
                    {
                        savingThrows.map((stat) => (
                            <div key={stat.name}>
                                <p>{stat.name} | Proficient <input type="checkbox"></input>
                                Expertise <input type="checkbox"></input></p>
                            </div>
                        ))
                    }
                    
                    <label>Skills</label> <br/>
                    {
                        skills.map((stat) => (
                            <div key={stat.name}>
                                <p>{stat.name} | Proficient <input type="checkbox"></input>
                                Expertise <input type="checkbox"></input></p>
                            </div>
                        ))
                    }
                    <label>Damage Resistances</label> <br/>
                    <select name="damage-res" className="bg-inherit">
                        {
                            damageTypes.map((dmg) => (
                                <option key={dmg} value={dmg} className="text-black">{dmg}</option>
                            ))
                        }
                    </select> <br/>
                    <label>Damage Immunities</label> <br/>
                    <select name="damage-imm" className="bg-inherit">
                        {
                            damageTypes.map((dmg) => (
                                <option key={dmg} value={dmg} className="text-black">{dmg}</option>
                            ))
                        }
                    </select> <br/>
                    <label>Condition Immunities</label> <br/>
                    <select name="cond-imm" className="bg-inherit">
                        {
                            conditions.map((cond) => (
                                <option key={cond} value={cond} className="text-black">{cond}</option>
                            ))
                        }
                    </select> <br/>
                    <label>Damage Vulnerabilities</label> <br/>
                    <select name="damage-vul" className="bg-inherit">
                        {
                            damageTypes.map((cond) => (
                                <option key={cond} value={cond} className="text-black">{cond}</option>
                            ))
                        }
                    </select> <br/>
                    <label>Condition Vulnerabilities</label> <br/>
                    <select name="cond-vul" className="bg-inherit">
                        {
                            conditions.map((cond) => (
                                <option key={cond} value={cond} className="text-black">{cond}</option>
                            ))
                        }
                    </select> <br/>
                    <label>Senses</label> <br/>
                    <p>Blindsight <input type="number" name="b-sight" className="bg-inherit"></input>ft.</p>
                    <p>Darkvision <input type="number" name="b-sight" className="bg-inherit"></input>ft.</p>
                    <p>Tremorsense <input type="number" name="b-sight" className="bg-inherit"></input>ft.</p>
                    <p>Truesight <input type="number" name="b-sight" className="bg-inherit"></input>ft.</p>
                    <label>Languages</label> <br/>
                    <input type="text" className="bg-inherit"></input> <br/>
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