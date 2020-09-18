import React from "react";
import {View} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";

import HelloPanel from "../../Panels/Hello";
import NewPodcast from "../../Panels/NewPodcast";
import PodcastEditor from "../../Panels/PodcastEditor";

import {HELLO_PANEL, NEW_PODCAST_PANEL, PODCAST_EDITOR_PANEL} from "../../constants/PanelConstants";

import {setPreviousPanel} from "../../state/reducers/history/actions";


const MainView = () => {
    const dispatch = useDispatch();
    const { activePanel, history } = useSelector((state) => state.history);

    return (
        <View
            history={history}
            activePanel={activePanel}
            onSwipeBack={() => dispatch(setPreviousPanel())}
        >
            <HelloPanel id={HELLO_PANEL} />
            <NewPodcast id={NEW_PODCAST_PANEL} />
            <PodcastEditor id={PODCAST_EDITOR_PANEL} />
        </View>
    );
};

export default MainView;
