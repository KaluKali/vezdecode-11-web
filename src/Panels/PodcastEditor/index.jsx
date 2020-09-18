import React from "react";
import {
    Cell,
    CellButton,
    Div,
    Group,
    Header,
    InfoRow,
    Input,
    List,
    Panel,
    PanelHeader,
    PanelHeaderBack
} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleToPreviousPanel} from "../../core/HistoryDispatcher";
import {useDispatch, useSelector} from "react-redux";
import Waveform from "./Waveform";
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import Icon28RemoveCircleOutline from '@vkontakte/icons/dist/28/remove_circle_outline';

require('./wavesurfer');

const {useRef, useEffect, useState} = require("react");

const PodcastEditor = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const wavesurfer = useRef(null);

    const music = useSelector(state =>state.vk.music);
    const form = useSelector(state =>state.vk.form);
    const [timecode, setTimeCode] = useState([]);
    const tracks = [
        {
            id: 0,
            title: form.title,
            file: form.link
        }
    ];
    const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Редактирование</PanelHeader>
            <Div>
                <div
                    style={{
                        border: '0.5px solid rgba(0, 0, 0, 0.08)',
                        boxSizing: 'border-box',
                        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.01)',
                        borderRadius:'10px'
                    }}
                >
                    <Waveform url={selectedTrack.file} wavesurfer={wavesurfer} />
                </div>
            </Div>
            <Group header={<Header mode="secondary">Таймкоды</Header>}>
                <List>
                    {timecode.map((time, index)=>
                        <Cell key={index} before={<Icon28RemoveCircleOutline key={index} onClick={(e)=>{
                            const temp = timecode.slice();
                            if (!index) setTimeCode([]);
                            else {
                                temp.splice(index,index);
                                setTimeCode([...temp]);
                            }
                        }} fill={'#E64646'}/>}
                              asideContent={<Div><Input defaultValue={time} align="center" /></Div>}><Div><Input /></Div></Cell>)}
                </List>
                <CellButton before={<Icon28AddCircleOutline />} onClick={()=>{
                    let time = wavesurfer.current.getCurrentTime();
                    const hours = Math.floor(time / 60 / 60);
                    const minutes = Math.floor(time / 60) - (hours * 60);
                    const seconds = Math.floor(time % 60);

                    setTimeCode([...timecode, [
                        hours.toString().padStart(2, '0'),
                        minutes.toString().padStart(2, '0'),
                        seconds.toString().padStart(2, '0')
                    ].join(':')])
                }} >Добавить таймкод</CellButton>
                <Div><InfoRow header={<label style={{fontSize:'13px'}}>Отметки времени с названием темы. Позволяют<br/>слушателям легче путешествовать по подкасту.</label>}/></Div>
            </Group>
        </Panel>
    );
};

PodcastEditor.propTypes = {
    id: PropTypes.string.isRequired,
};

export default PodcastEditor;
