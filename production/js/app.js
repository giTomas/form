const Forms = (function() {
  "use strict";
    // fn globals
    const signup            = document.getElementById('js-singup');
    const login             = document.getElementById('js-login');
    const signupOpen        = document.getElementById('js-signup-open');
    const loginOpen         = document.getElementById('js-login-open');
    const signupClose       = document.getElementById('js-signup-close');
    const loginClose        = document.getElementById('js-login-close');
    const signupContainer   = document.getElementById('js-signup-container');
    const loginContainer    = document.getElementById('js-login-container');
    const usernameUsed      = document.getElementById('js-username-used');
    const passwordInvalid   = document.getElementById('js-password-invalid');
    const loginInputInvalid = document.getElementById('js-input-invalid');

    // ANIMATIONS
    function animOpen(el, el1) {
      const tl = new TimelineLite();
      tl.to(el, 1.4, {display: "flex", opacity: 1 })
        .from(el1, 0.6, {y: -600}, 0.2)
        .to(el1, 0.8, {boxShadow:"2px 2px 8px rgba(9, 96, 165, 0.8)"}, 0.5);
    }

    function animClose(el, el1, el2) {
      const tl = new TimelineLite();
      tl.to(el, 1.4, {display: "none", opacity: 0 })
        .to(el1, 0.5, {display: "none", opacity: 0 }, 0)
        .to(el2, 0.5, {boxShadow: "2px 2px 7px rgba(9, 96, 165, 0)"}, 0)
        .to(el2, 0.6, {y: -600}, 0.1)
        .to(el2, 0, {y: 0});
    }

    // HANDLERS
    const signupOpenHandler = (event) => {
      // const x = event.clientX;
      // const y = event.clientY;
      animOpen(signupContainer, signup);
    };

    const loginOpenHandler = (event) => {
      animOpen(loginContainer, login);
    };

    const signupCloseHandler = (event) => {
      animClose(signupContainer, passwordInvalid, signup);
      signup.reset();
    }

    const loginCloseHandler = (event) => {
      animClose(loginContainer, loginInputInvalid, login);
      login.reset();
    }

    const loginHandler = (event) => {
      console.log('click');
      TweenLite.to(loginInputInvalid, 0, {display: "none", opacity: 0 });
      login.reset();
      event.preventDefault();
    }

    const sendHandler = (event) => {
      const usernameUsed    = document.getElementById('js-username-used');
      const formData        = new FormData(signup);
      const password        = formData.get('password');
      const passwordRepeat  = formData.get('passwordrepeat');
      TweenLite.to(passwordInvalid, 0, {display: "none", opacity: 0 });

      //TODO ajax check if username exists

      if (password === passwordRepeat) {
        formData.delete('passwordrepeat');
      } else {
        TweenLite.to(passwordInvalid, 1, {display: "flex", opacity: 1 });
        event.preventDefault();
        return;
      }

      // TODO send ajax post with new user in formData obj

      signup.reset();
      event.preventDefault();
    };

    //PUBLIC EVENTLISTENERS
    const signupListener      = signup.addEventListener('submit', sendHandler, false);
    const loginListener       = login.addEventListener('submit', loginHandler, false);
    const openSignupListener  = signupOpen.addEventListener('click', signupOpenHandler, false);
    const openLoginLister     = loginOpen.addEventListener('click', loginOpenHandler, false);
    const closeSignupListener = signupClose.addEventListener('click', signupCloseHandler, false);
    const closeLoginListener  = loginClose.addEventListener('click', loginCloseHandler, false);


    return {
      listeners: [signupListener,
                  openLoginLister,
                  openSignupListener,
                  closeSignupListener,
                  closeLoginListener,
                  loginListener ]
    }

})();

Forms.listeners;
