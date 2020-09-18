import React from "react";
import {Button, Panel, PanelHeader, Placeholder} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {NEW_PODCAST_PANEL} from "../../constants/PanelConstants";
import {handleSetActivePanel} from "../../core/HistoryDispatcher";
import {useDispatch} from "react-redux";
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';

const Hello = (props) => {
    const { id } = props;
    const dispatch = useDispatch();

    return (
        <Panel id={id}>
            <PanelHeader>Подкасты</PanelHeader>
            <Placeholder
                icon={<Icon56AddCircleOutline />}
                header={'Добавьте первый подкаст'}
                action={<Button onClick={() => handleSetActivePanel(dispatch, NEW_PODCAST_PANEL)}>Добавить подкаст</Button>}
                stretched
            >
                Добавляйте, редактируйте и делитесь<br/>подкастами вашего сообщества.
            </Placeholder>
        </Panel>
    );
};

Hello.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Hello;
