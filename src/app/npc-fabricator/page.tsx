'use client';
import { create } from "domain";
import { useState, FormEvent } from "react";
import { createPortal } from 'react-dom';

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
                    "Petrified", "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious"];
interface Stat {                
    name: string,
    score?: number,
    modifier: number
};    

interface Action {
    name: string,
    hit?: string,
    stat?: string,
    damage: [string],
    savingThrow?: [string],
    bonus?: boolean,
    legendary?: boolean,
    lair?: boolean,
    mythic?: boolean,
    description?: string
};    

interface Statblock {
    name: string,
    npcType: string,
    alignment: string,
    npcSize: string,
    armorClass: number,
    hitDice: string,
    challengeRating: number,
    savingThrows?: [Stat],
    skills?: [Stat],
    dmgResist?: [string],
    dmgImmune?: [string],
    dmgVulnerable?: [string],
    conditionResist?: [string],
    conditionImmune?: [string],
    conditionVulnerable?: [string],
    senses?: [string],
    languages: [string],
    traits?: [string],
    actions?: [Action],
    reactions?: [Action],
    lair?: [Action],
    mythic?: [Action]
};    

function SelectOption(dropdown: HTMLSelectElement) {
    console.log(`Hey you selected ${dropdown.options[dropdown.selectedIndex].text}`);
}

function SaveMonster(e: FormEvent) {
    e.preventDefault();
}    

function AddSpeed() {
    return (
        <section className="w-fit m-auto p-4 border-2">
            <h1 className="text-3xl text-center">Add Speed</h1>
            <input type="number" name="walking" className="bg-inherit"/>ft.
        </section>        
    )
}    

function AddAction({ onClose }) {
    const [damageType, setDamageType] = useState('Slashing');
    const [statType, setStatType] = useState('STR');
    const [dieCount, setDieCount] = useState("1")
    const [sidedDie, setSidedDie] = useState("6");

    return (
        <section className="m-auto w-fit p-4 border-2">
            <h1 className="text-3xl text-center">Add Action</h1>
            <label htmlFor="action-name">Name</label><br/>
            <input type="text" name="action-name" className="bg-inherit"/><br/>
            <label htmlFor="action-dmg-type">Damage Type</label> <br/>
            <select name="action-dmg-type" value={damageType} onChange={e => setDamageType(e.target.value)} 
                    className="bg-inherit">
                {
                    damageTypes.map((dmg) => (
                        <option key={dmg} value={dmg} className="text-black">{dmg}</option>
                    ))
                }
            </select> <br/>
            <label htmlFor="action-stat-modifier">Action Stat Modifier</label> <br/>
            <select name="action-stat-modifier" value={statType} onChange={e => setStatType(e.target.value)}
                    className="bg-inherit">
                {
                    stats.map((stat) => (
                        <option key={stat.name} value={stat.score} className="text-black">{stat.name}</option>
                    ))
                }
            </select> <br/>
            <label htmlFor="die-count">Damage </label>
            <input type="number" 
                   name="die-count" 
                   className="w-1/12 bg-inherit"
                   value={dieCount}
                   onChange={e => setDieCount(e.target.value)}
            />d
            <input type="number" 
                   name="die-side"
                   className="w-1/12 bg-inherit"
                   value={sidedDie}
                   onChange={e => setSidedDie(e.target.value)}
            /> <br/>
            <label htmlFor="desc">Description</label> <br/>
            <input type="text" name="desc" className="bg-inherit"/> <br/>
            <label htmlFor="proficient">Proficient? </label>
            <input type="checkbox" name="proficient"/> <br/>
            <label htmlFor="expert">Expert? </label>
            <input type="checkbox" name="expert"/> <br/>
            <button type="button">Save</button>
            <button type="button" onClick={onClose}>Close</button>
        </section>        
    )
}    
export default function NPCFab() {
    const [addAction, setAddAction] = useState(false);
    const [addReaction, setAddReaction] = useState(false);
    const [addLegendary, setAddLegendary] = useState(false);
    const [addLair, setAddLair] = useState(false);
    const [addMythic, setAddMythic] = useState(false);
    return (
        <>
            <h1 className="text-6xl">NPC Fabricator</h1>
            <h2 className="text-3xl">
                 Statblock Character Card
            </h2>
            <section>
                <form method="POST" onSubmit={SaveMonster}>
                    <h1>
                        Basic Information
                    </h1>
                    <label htmlFor="npc-name">Name</label> <br/>
                    <input type="text" name="npc-name" className="bg-inherit inline-block"></input>

                    <label>Type</label> <br/>
                    <input type="text" name="npc-type" className="bg-inherit inline-block"></input> <br/>

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

                    <label htmlFor="npc-ac">Armor Class</label> <br/>
                    <input type="number" name="npc-ac" min="1" max="40" className="bg-inherit w-fit"></input> <br/>
                    <table className="border-2">
                        <tbody>
                            <tr>
                                {
                                    stats.map((stat) => (
                                        <th key={stat.name} className="border-b-2 border-r-2">{stat.name}</th>
                                    ))
                                }
                            </tr>
                            
                            <tr>
                                {
                                    stats.map((stat) => (
                                        <th key={stat.name}>
                                            <input type="number" min="1" max="40" name={stat.name} 
                                                   defaultValue={stat.score} className="bg-inherit border-r-2">
                                            </input>
                                        </th>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                    <label>Hit Points</label> <br/>
                    <label htmlFor="npc-cr">Challenge Rating</label> <br/>
                    <input type="number" min="1" max="30" name="npc-cr" className="bg-inherit"></input> <br/>
                    <h1>Modifiers</h1>
                    <label>Speed</label> <br/>
                    
                    <AddSpeed/>
                    
                    <hr/>
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
                    <p>
                        Blindsight 
                        <input type="number" min="1" max="240" name="b-sight" className="bg-inherit w-fit"></input>ft.
                    </p>

                    <p>
                        Darkvision 
                        <input type="number" min="1" max="240" name="d-sight" className="bg-inherit w-fit"></input>ft.
                    </p>
                    <p>
                        Tremorsense 
                        <input type="number" min="1" max="240" name="tr-sight" className="bg-inherit w-fit"></input>ft.
                    </p>
                    <p>
                        Truesight 
                        <input type="number" min="1" max="240" name="t-sight" className="bg-inherit w-fit"></input>ft.
                    </p>
                    <label>Languages</label> <br/>
                    <input type="text" className="bg-inherit"></input> <br/>
                    <label>Traits</label> <br/>
                    <label>Actions</label> <br/>
                    <button type="button" onClick={() => setAddAction(true)}>
                        Add Action
                    </button>
                    {
                        addAction && createPortal(
                            <AddAction onClose={() => setAddAction(false)}/>,
                            document.body
                        )
                    }
                    <label>Reactions</label> <br/>
                    <button type="button" onClick={() => setAddReaction(true)}>
                        Add Reaction
                    </button>
                    {
                        addReaction && createPortal(
                            <AddAction onClose={() => setAddReaction(false)}/>,
                            document.body
                        )
                    } <br/>
                    <label>Legendary Actions</label> <br/>
                    <button type="button" onClick={() => setAddLegendary(true)}>
                        Add Legendary Action
                    </button>
                    {
                        addLegendary && createPortal(
                            <AddAction onClose={() => setAddLegendary(false)}/>,
                            document.body
                        )
                    } <br/>
                    <label>Lair Actions</label> <br/>
                    <button type="button" onClick={() => setAddLair(true)}>
                        Add Lair Action
                    </button>
                    {
                        addLair && createPortal(
                            <AddAction onClose={() => setAddLair(false)}/>,
                            document.body
                        )
                    } <br/>
                    <label>Mythic Actions</label> <br/>
                    <button type="button" onClick={() => setAddMythic(true)}>
                        Add Action
                    </button>
                    {
                        addMythic && createPortal(
                            <AddAction onClose={() => setAddMythic(false)}/>,
                            document.body
                        )
                    } <br/>
                    <footer className="bg-purple-500 text-center w-full fixed bottom-0">
                        <button name="save" type="submit" className="border-2 p-4">Save</button>
                        <button className="border-2 p-4">Undo</button>
                    </footer>
                </form>
            </section>
        </>
    );
}