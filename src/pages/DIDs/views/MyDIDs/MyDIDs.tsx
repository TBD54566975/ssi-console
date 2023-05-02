import { Component } from "solid-js";

const MyDIDs: Component = () => {
    return (
        <>
            <section class="panel">
                <ul>
                    {didKeys && didKeys.map(key => 
                        <li>{key}</li>
                    )}
                </ul>
            </section>
        </>
    )
}

export default MyDIDs;

const didKeys = [
    "did:key:1234567890zxcvbnmlkjhgfdsqwertyuio1234567890",
    "did:key:lkjhgfdsdfghjiuytrtyu89876543ertyujjhgfghjlk",
    "did:key:zxcvbn23456789xcvbnm987654xcvbnkjhgfdghjmhjj"
]
const didWebs = [
    "did:web:example.com",
    "did:web:tbd.website"
]
const didIons = [
    "did:ion:1234567890poiuytrewqlkjhgfdsa",
    "did:ion:zaq123esdxcde34rfvgtr56ygbnhy"
]