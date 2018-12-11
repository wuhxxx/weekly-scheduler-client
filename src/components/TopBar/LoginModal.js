import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
    LOGINMODAL_FORM_SIGNIN,
    LOGINMODAL_FORM_RESET,
    LOGINMODAL_FORM_SIGNUP
} from "../../constants.js";
import SigninForm from "./SigninForm.js";
import SignupForm from "./SignupForm.js";
import ResetForm from "./ResetForm.js";
import "../../styles/LoginModal.css";

// login modal root in index.html
const loginModalRoot = document.getElementById("login-modal-root");

// ESC key code
const ESC_KEY = 27;

export default class LoginModal extends Component {
    // prop types
    static propTypes = {
        isModalOpen: PropTypes.bool,
        formToOpen: PropTypes.string,
        closeModal: PropTypes.func,
        openModalWithForm: PropTypes.func
    };

    componentDidMount() {
        console.log("LoginModal did mount");
        // console.log("this.DOMNode = ", this.mountedDOMNode);
    }

    componentDidUpdate() {
        console.log("LoginModal did update");
        // todo: get rid of setTimeout()
        if (this.props.isModalOpen) {
            // console.log("before execute focus");
            // console.log(document.activeElement);
            // console.log("modal dom node:", this.mountedDOMNode);
            // ReactDOM.findDOMNode(this).focus();
            // this.mountedDOMNode.focus();
            // console.log("after execute focus");
            // console.log(document.activeElement);
            setTimeout(() => {
                // ReactDOM.findDOMNode(this).focus();
                this.mountedDOMNode.focus();
                // console.log("after execute focus");
                // console.log(document.activeElement);
            }, 500);
            // if timeout is 10, focus won't work
            // timeout 11 ~ 20, sometimes works
        }
    }

    handleESCKeyDown = event => {
        event.stopPropagation();
        if (event.keyCode === ESC_KEY) {
            this.props.closeModal();
        }
    };

    render() {
        const {
            isModalOpen,
            formToOpen,
            closeModal,
            openModalWithForm
        } = this.props;

        const signinForm = (
            <SigninForm
                openModalWithForm={openModalWithForm}
                closeModal={closeModal}
            />
        );

        const signupForm = (
            <SignupForm
                openModalWithForm={openModalWithForm}
                closeModal={closeModal}
            />
        );

        const resetForm = (
            <ResetForm
                openModalWithForm={openModalWithForm}
                closeModal={closeModal}
            />
        );

        // select which form to render, default signin form
        let formToRender = signinForm;
        if (formToOpen === LOGINMODAL_FORM_SIGNUP) formToRender = signupForm;
        else if (formToOpen === LOGINMODAL_FORM_RESET) formToRender = resetForm;

        return ReactDOM.createPortal(
            <div
                onKeyDown={this.handleESCKeyDown}
                tabIndex="-1"
                ref={node => (this.mountedDOMNode = node)}
                className={
                    isModalOpen
                        ? "cd-signin-modal cd-signin-modal--is-visible"
                        : "cd-signin-modal"
                }
            >
                {/* Cover Layer */}
                <div
                    data-iscoverlayer="true"
                    className="login-modal-cover-layer"
                    onClick={closeModal}
                />

                {/* Forms Container */}
                <div className="cd-signin-modal__container">
                    {/* Signin/Signup tabs */}
                    <ul className="cd-signin-modal__switcher js-signin-modal-switcher">
                        <li>
                            <a
                                href="#0"
                                onClick={openModalWithForm(
                                    LOGINMODAL_FORM_SIGNIN
                                )}
                                className={
                                    formToOpen !== LOGINMODAL_FORM_SIGNUP
                                        ? "cd-selected"
                                        : ""
                                }
                            >
                                Sign in
                            </a>
                        </li>
                        <li>
                            <a
                                href="#0"
                                onClick={openModalWithForm(
                                    LOGINMODAL_FORM_SIGNUP
                                )}
                                className={
                                    formToOpen === LOGINMODAL_FORM_SIGNUP
                                        ? "cd-selected"
                                        : ""
                                }
                            >
                                New account
                            </a>
                        </li>
                    </ul>

                    {formToRender}

                    <a
                        href="#0"
                        className="cd-signin-modal__close"
                        onClick={closeModal}
                    >
                        Close
                    </a>
                </div>
            </div>,
            loginModalRoot
        );
    }
}