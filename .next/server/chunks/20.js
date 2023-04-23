"use strict";
exports.id = 20;
exports.ids = [20];
exports.modules = {

/***/ 6667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Loader = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "circularLoaderContainer",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "circularLoader"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ }),

/***/ 5602:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var _Loader_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6667);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__]);
firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const CreateCampaign = (props)=>{
    const db = props.db;
    const [showLoader, setShowLoader] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const randomStringGenerator = ()=>{
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 10; i++)text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    const calculateEndDate = (startDate, duration)=>{
        let endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);
        return endDate;
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative px-4 animate__animated animate__fadeInUp animate__faster h-[80vh] overflow-scroll",
        children: [
            showLoader && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "absolute z-[100] top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-white bg-opacity-90",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loader_Loader__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "font-black leading-tight text-[2.8rem] mb-5",
                children: "Your campaign details"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
                initialValues: {
                    campaign: "",
                    campaignAmount: 0,
                    campaignDuration: 0,
                    message: ""
                },
                validate: (values)=>{
                    const errors = {};
                    if (!/(.*[a-z]){2}/i.test(values.campaign)) {
                        errors.campaign = "Please add your campaign name";
                    }
                    return errors;
                },
                onSubmit: async (values, { setSubmitting  })=>{
                    setShowLoader(true);
                    console.log(calculateEndDate(new Date(), values.campaignDuration));
                    //  setTimeout(async() => {
                    //  alert(JSON.stringify(values, null, 2));
                    try {
                        localStorage.setItem("campaign", values.campaign);
                        localStorage.setItem("campaignAmount", values.campaignAmount);
                        localStorage.setItem("campaignDuration", values.campaignDuration);
                        localStorage.setItem("status", "active");
                        localStorage.setItem("completionDate", calculateEndDate(new Date(), values.campaignDuration));
                        localStorage.setItem("message", values.message);
                        localStorage.setItem("campaignID", randomStringGenerator());
                        const set = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(db, "chippin", `${localStorage.getItem("uid")}/campaigns/${localStorage.getItem("campaignID")}`), {
                            name: localStorage.getItem("campaign"),
                            campaignAmount: localStorage.getItem("campaignAmount"),
                            amountContributed: 0,
                            campaignDuration: localStorage.getItem("campaignDuration"),
                            status: localStorage.getItem("status"),
                            completionDate: localStorage.getItem("completionDate"),
                            campaignMessage: localStorage.getItem("message")
                        }, {
                            merge: true
                        });
                        console.log(set);
                    } catch (e) {
                        setShowLoader(false);
                        setSubmitting(false);
                        console.log(e);
                        return;
                    }
                    setShowLoader(false);
                    setSubmitting(false);
                    props.nextStep();
                //  }, 400);
                },
                children: ({ values , errors , touched , handleChange , handleBlur , handleSubmit , isSubmitting  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        onSubmit: handleSubmit,
                        className: "flex flex-col justify-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "campaign",
                                        className: "font-bold",
                                        children: "Name of campaign"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "text",
                                        name: "campaign",
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        value: values.campaign,
                                        className: "w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light",
                                        placeholder: "Give your campaign a name"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-error-500",
                                        children: errors.campaign && touched.campaign && errors.campaign
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "border border-grey-superlight shadow-lg rounded-md flex flex-row mt-8 p-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "w-1/2 flex flex-col items-center border border-transparent border-r-grey-dark",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "font-bold",
                                                        children: [
                                                            "R",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "text-2xl",
                                                                children: values.campaignAmount
                                                            }),
                                                            ".00"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "text-grey-light",
                                                        children: "Goal amount"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "w-1/2 flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "font-bold",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "text-2xl",
                                                                children: values.campaignDuration
                                                            }),
                                                            " days"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "text-grey-light",
                                                        children: "Campaign duration"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "campaignAmount",
                                        className: "font-bold mt-10 block",
                                        children: "How much do you need?"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "range",
                                        id: "campaignAmount",
                                        name: "campaignAmount",
                                        onInput: handleChange,
                                        onBlur: handleBlur,
                                        value: values.campaignAmount,
                                        min: "1000",
                                        max: "10000",
                                        step: "100",
                                        className: "w-full mt-4"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "campaignDuration",
                                        className: "font-bold mt-10 block",
                                        children: "Campaign duration"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "range",
                                        id: "campaignDuration",
                                        name: "campaignDuration",
                                        onInput: handleChange,
                                        onBlur: handleBlur,
                                        value: values.campaignDuration,
                                        min: "7",
                                        max: "90",
                                        step: "1",
                                        className: "w-full mt-4"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "message",
                                        className: "font-bold mt-10 block",
                                        children: "Personalised message"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        as: "textarea",
                                        id: "message",
                                        name: "message",
                                        rows: "5",
                                        className: "w-full my-8 rounded-md shadow-lg",
                                        value: values.message
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "btn btn-gradient w-[160px] mx-auto mb-20",
                                children: "Next"
                            })
                        ]
                    })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateCampaign);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6956:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2807);
/* harmony import */ var react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6290);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);





const ShareCampaign = (props)=>{
    const campaignID = localStorage.getItem("campaignID");
    const uid = localStorage.getItem("uid");
    const [copyValue, setCopyValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("chippin.netlify.app/campaign?id=" + localStorage.getItem("campaignID") + "&userid=" + localStorage.getItem("uid"));
    const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const copyHandler = ()=>{
        setCopied(true);
        setTimeout(()=>{
            setCopied(false);
        }, 2000);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        localStorage.removeItem("bankName");
        localStorage.removeItem("otherBankName");
        localStorage.removeItem("accNumber");
        localStorage.removeItem("accHolder");
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-9/12 md:w-8/12 lg:w-9/12 max-w-[320px] _h-[85%] _top-[15%] left-0 right-0 mx-auto",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "mt-10 text-center",
                children: "SHARE CAMPAIGN"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full mx-auto mt-5",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_2__.CopyToClipboard, {
                        className: "relative flex flex-row justify-between p-3 rounded border bg-white border-gray cursor-pointer transition duration-200 ease-in hover:border-success",
                        text: copyValue,
                        onCopy: copyHandler,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-success-500",
                                    children: "Click to copy your campaign URL"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaCopy, {
                                        className: "text-success-500 text-2xl"
                                    })
                                }),
                                copied && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "flex flex-row justify-center items-center absolute w-full h-full bg-success-500 bg-opacity-90 rounded top-0 left-0 text-white font-bold",
                                    children: "Copied!"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                        href: `/campaign?id=${campaignID}&userid=${uid}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mt-20 btn btn-gradient",
                            children: "View Campaign"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        onClick: props.openDashboard,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mt-5 btn btn-white",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "Go to your Dashboard"
                            })
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShareCampaign);


/***/ })

};
;