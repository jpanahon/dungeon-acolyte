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

function SaveMonster(e) {
    e.preventDefault();

    let stats = new FormData(e.currentTarget);

    let statblock = Statblock{};
}

function AddSpeed({ onClose }) {
    return (
        <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 
                            -translate-y-1/2 w-fit p-4 border-2 z-10 bg-inherit">
            <h1 className="text-xl text-center">Add Speed</h1>
            <input type="number" name="walking" className="bg-inherit"/>ft.
            <button type="button" onClick={onClose} className="absolute right-0 top-0 p-4 text-xl">&times;</button>
        </section>        
    )
}    

function AddAction({ onClose, actionType }) {
    const [damageType, setDamageType] = useState('Slashing');
    const [statType, setStatType] = useState('STR');
    const [dieCount, setDieCount] = useState("1");
    const [sidedDie, setSidedDie] = useState("6");

    
    return (
        <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 w-fit p-4 border-2 z-10 bg-inherit">
            <h1 className="text-xl text-center">Add {actionType}</h1>
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
            <button type="button" onClick={onClose} className="absolute right-0 top-0 p-4 text-xl">&times;</button>
        </section>        
    )
}    
export default function NPCFab() {
    // Action Modals
    const [addAction, setAddAction] = useState(false);
    const [addReaction, setAddReaction] = useState(false);
    const [addLegendary, setAddLegendary] = useState(false);
    const [addLair, setAddLair] = useState(false);
    const [addMythic, setAddMythic] = useState(false);
    const [addSpeed, setAddSpeed] = useState(false);
    
    const [CR, setCR] = useState("1/8");
    
    return (
        <>
            <div className="text-center">
                <h1 className="text-6xl">NPC Fabricator</h1>
                <h2 className="text-xl">Statblock Character Card</h2>
            </div>

            <div className="flex">
            <section className="w-1/2">
                <form method="POST" onSubmit={SaveMonster}>
                    <details className="p-4" open>
                        <summary className="text-xl p-4">Basic Information</summary>
                        <div className="inline-block p-4">
                            <label htmlFor="npc-name">Name</label> <br/>
                            <input type="text" name="npc-name" className="bg-inherit"></input>
                        </div>

                        <div className="inline-block p-4">
                            <label htmlFor="npc-species">Species</label> <br/>
                            <input type="text" name="npc-species" className="bg-inherit"></input>
                        </div>

                        <div className="inline-block p-4">
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
                            </select>
                        </div>

                        <div className="inline-block p-4">
                            <label htmlFor="npc-size">Size</label> <br/>
                            <select name="npc-size" defaultValue="M" className="bg-inherit">
                                <option value="T" className="text-black">Tiny</option>
                                <option value="S" className="text-black">Small</option>
                                <option value="M" className="text-black">Medium</option>
                                <option value="L" className="text-black">Large</option>
                                <option value="H" className="text-black">Huge</option>
                                <option value="G" className="text-black">Gargantuan</option>
                            </select>
                        </div>
                        
                        <div className="inline-block p-4">
                            <label htmlFor="npc-ac">Armor Class</label> <br/>
                            <input type="number" name="npc-ac" 
                                   min="1" max="40" defaultValue="10"
                                   className="bg-inherit w-fit"
                            />
                        </div>

                        <div className="inline-block p-4">
                            <label>Hit Points</label> <br/>
                        </div>

                        <div className="inline-block p-4">
                            <label htmlFor="npc-cr">Challenge Rating</label> <br/>
                            <input type="number" min="1" max="30" name="npc-cr" className="bg-inherit"
                                   value={CR} onChange={e => setCR(e.target.value)}/>
                        </div>

                        <div className="inline-block p-4">
                            <label>Languages</label> <br/>
                            <input type="text" className="bg-inherit"></input>
                        </div>

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
                    </details>

                    <hr/>

                    <details className="p-4" open>
                        <summary className="text-xl p-4">Modifiers</summary>
                        <div className="inline-block p-4">
                            <label>Speed</label> <br/>
                            <p>Walking: <input type="number" min="0" className="w-fit bg-inherit"/>ft.</p>
                            <button type="button" onClick={() => setAddSpeed(true)}>Add Speed</button>
                            {
                                addSpeed && createPortal(
                                    <AddSpeed onClose={() => setAddSpeed(false)}/>,
                                    document.body
                                )
                            }
                        </div>
                        
                        <div className="inline-block p-4">
                            <label>Saving Throws</label> <br/>
                            <select className="bg-inherit" name="saving-throws">
                            {
                                savingThrows.map((stat) => (
                                    <option key={stat.name} value={stat.name}>{stat.name}</option>
                                ))
                            }
                            </select>
                        </div>
                        
                        <div className="inline-block p-4">
                            <label>Skills</label> <br/>
                            <select className="bg-inherit" name="skills">
                            {
                                skills.map((stat) => (
                                    <option key={stat.name} value={stat.name}>{stat.name}</option>
                                ))
                            }
                            </select>
                        </div>
                        
                        <div className="inline-block p-4">
                            <label>Damage Resistances</label> <br/>
                            <select name="damage-res" className="bg-inherit">
                                {
                                    damageTypes.map((dmg) => (
                                        <option key={dmg} value={dmg} className="text-black">{dmg}</option>
                                    ))
                                }
                            </select> <br/>
                        </div>

                        <div className="inline-block p-4">
                            <label>Damage Immunities</label> <br/>
                            <select name="damage-imm" className="bg-inherit">
                                {
                                    damageTypes.map((dmg) => (
                                        <option key={dmg} value={dmg} className="text-black">{dmg}</option>
                                    ))
                                }
                            </select> <br/>
                        </div>

                        <div className="inline-block p-4">
                            <label>Condition Immunities</label> <br/>
                            <select name="cond-imm" className="bg-inherit">
                                {
                                    conditions.map((cond) => (
                                        <option key={cond} value={cond} className="text-black">{cond}</option>
                                    ))
                                }
                            </select> <br/>
                        </div>

                        <div className="inline-block p-4">
                            <label>Damage Vulnerabilities</label> <br/>
                            <select name="damage-vul" className="bg-inherit">
                                {
                                    damageTypes.map((cond) => (
                                        <option key={cond} value={cond} className="text-black">{cond}</option>
                                    ))
                                }
                            </select> <br/>
                        </div>

                        <div className="inline-block p-4">
                            <label htmlFor="cond-vul">Condition Vulnerabilities</label> <br/>
                            <select name="cond-vul" className="bg-inherit">
                                {
                                    conditions.map((cond) => (
                                        <option key={cond} value={cond} className="text-black">{cond}</option>
                                    ))
                                }
                            </select> <br/>
                        </div>

                        <div className="inline-block p-4">
                            <label>Senses</label> <br/>
                            <p className="inline-block">
                                Blindsight
                                 <input type="number" min="1" max="240" name="b-sight" className="bg-inherit w-fit"/>ft.
                            </p>

                            <p className="inline-block p-4">
                                Darkvision
                                 <input type="number" min="1" max="240" name="d-sight" className="bg-inherit w-fit"/>ft.
                            </p>

                            <p className="inline-block p-4">
                                Tremorsense
                                 <input type="number" min="1" max="240" name="tr-sight" className="bg-inherit w-fit"/>ft.
                            </p>
                            
                            <p className="inline-block p-4">
                                Truesight
                                 <input type="number" min="1" max="240" name="t-sight" className="bg-inherit w-fit"/>ft.
                            </p>
                        </div>
                    </details>
                    <hr/>
                    <details className="p-8">
                        <summary className="text-xl">Traits</summary>
                    </details>

                    <details className="p-8">
                        <summary className="text-xl">Actions</summary>
                        <button type="button" onClick={() => setAddAction(true)}>
                            Add Action
                        </button>
                        {
                            addAction && createPortal(
                                <AddAction onClose={() => setAddAction(false)} actionType={"Action"}/>,
                                document.body
                            )
                        }
                    </details>

                    <details className="p-8">
                        <summary className="text-xl">Reactions</summary>
                        <button type="button" onClick={() => setAddReaction(true)}>
                            Add Reaction
                        </button>
                        {
                            addReaction && createPortal(
                                <AddAction onClose={() => setAddReaction(false)} actionType={"Reaction"}/>,
                                document.body
                            )
                        }
                    </details>

                    <details className="p-8">
                        <summary className="text-xl">Legendary Actions</summary>
                        <button type="button" onClick={() => setAddLegendary(true)}>
                            Add Legendary Action
                        </button>
                        {
                            addLegendary && createPortal(
                                <AddAction onClose={() => setAddLegendary(false)} actionType={"Legendary Action"}/>,
                                document.body
                            )
                        }
                    </details>

                    <details className="p-8">
                        <summary className="text-xl">Lair Actions</summary>
                        <button type="button" onClick={() => setAddLair(true)}>
                            Add Lair Action
                        </button>
                        {
                            addLair && createPortal(
                                <AddAction onClose={() => setAddLair(false)} actionType={"Lair Action"}/>,
                                document.body
                            )
                        }
                    </details>

                    <details className="p-8">
                        <summary className="text-xl">Mythic Actions</summary> <br/>
                        <button type="button" onClick={() => setAddMythic(true)}>
                            Add Action
                        </button>
                        {
                            addMythic && createPortal(
                                <AddAction onClose={() => setAddMythic(false)} actionType={"Mythic Action"}/>,
                                document.body
                            )
                        }
                    </details>
                    <footer className="bg-purple-500 w-full fixed bottom-0">
                        <h1 className="text-xl inline-block">Challenge Rating: {CR}</h1>
                        <div className="inline-block text-right">
                            <button name="save" type="submit" className="p-4">Save</button>
                            <button className="p-4">Undo</button>
                        </div>
                    </footer>
                </form>
            </section>
            
            <section className="w-1/2 border-2 p-4 bg-[#fdf1dc] text-black">
                <h1 className="font-bold text-red-800 text-3xl">My Monster</h1>
                <h1><i>Medium monstrocity, lawful evil</i></h1>
                <hr className="bg-red-800 p-0.5"/>
                <h1 className="font-bold text-red-800">Armor Class </h1>        
                <h1 className="font-bold text-red-800">Hit Points </h1>
                <h1 className="font-bold text-red-800">Speed </h1>
                <hr className="bg-red-800 p-0.5"/>
                <table>
                    <tbody>
                        <tr className="text-center">
                            {
                                stats.map((stat) => (
                                    <th key={stat.name} className="font-bold text-red-800 pr-4">{stat.name}</th>
                                ))
                            }
                        </tr>
                        
                        <tr className="text-center">
                            {
                                stats.map((stat) => (
                                    <th key={stat.name}>{stat.score}</th>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
                <hr className="bg-red-800 p-0.5"/>
                <h1 className="font-bold text-red-800">Saving Throws </h1>
                <h1 className="font-bold text-red-800">Damage Resistances </h1>
                <h1 className="font-bold text-red-800">Damage Immunities </h1>
                <h1 className="font-bold text-red-800">Damage Vulnerabilities </h1>
                <h1 className="font-bold text-red-800">Condition Resistances </h1>
                <h1 className="font-bold text-red-800">Condition Immunities </h1>
                <h1 className="font-bold text-red-800">Condition Vulnerabilities </h1>
                <h1 className="font-bold text-red-800">Senses </h1>
                <h1 className="font-bold text-red-800">Languages </h1>
                <h1 className="font-bold text-red-800">Challenge Rating </h1>
                <hr className="bg-red-800 p-0.5"/>
                
            </section>
            </div>
        </>
    );
}