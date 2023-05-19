import { Component } from "solid-js";
import "./Requests.scss";
import Icon, { ExternalArrow, Plus } from "../../../../icons/Icon";
import Modal from "./Modal/Modal";
import { useNavigate } from "@solidjs/router";

const Requests: Component = () => {
    const navigate = useNavigate();
    const requestId = '123';
    return (
        <section class="item-panel">
            <Modal content={{
                button: {
                    className: "item-panel-card card-create-new",
                    label: <> <Icon svg={Plus} /> <p>Create new</p> </>
                }
            }} />
            {requests && requests.map(credential => 
                <div class="item-panel-card">
                    <div>
                        <div class="item-panel-card-header">
                            <div class="item-panel-card-header-icon" data-icon={credential.name[0]}></div>
                            <p class="item-panel-card-header-title">
                                {credential.name}
                            </p>
                        </div>
                        <p class="item-panel-card-body">
                            {credential.description}
                        </p>
                    </div>
                    <div>
                        <a class="item-panel-card-link" href={`${location.origin}/submit/${requestId}`}>
                            Submission URL <Icon svg={ExternalArrow} />
                        </a>
                        <button onClick={() => navigate(requestId)}
                            class="item-panel-card-button secondary-button">
                            Details
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Requests;

const requests = [
    {
        name: "Proof of KYC",
        description: "Request for a credential proving subject passed KYC",
    },
    {
        name: "Proof of Course 1",
        description: "Request for a credential proving subject passed Course 1",
    },
    {
        name: "Proof of Course 2",
        description: "Request of proof that subject passed Course 2",
    },
]