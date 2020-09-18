import React, {useEffect} from "react";
import {ConfigProvider, Root} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../state/reducers/vk/actions";

import MainView from "../Views/Root";

import {ROOT_VIEW} from "../constants/ViewConstants";

import {setPreviousPanel} from "../state/reducers/history/actions";

import "../styles/index.scss";
import "@vkontakte/vkui/dist/vkui.css";


const App = () => {
    const dispatch = useDispatch();
    const {activeView} = useSelector((state) => state.history);

    useEffect(() => {
        window.addEventListener("popstate", () => dispatch(setPreviousPanel()));
        dispatch(getUser());
    }, []);

    return (
        <ConfigProvider isWebView={true}>
            <Root id="APP" activeView={activeView}>
                <MainView id={ROOT_VIEW}/>
            </Root>
        </ConfigProvider>
    );
};

export default App;
