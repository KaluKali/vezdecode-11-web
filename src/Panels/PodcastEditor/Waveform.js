import React, {useEffect, useRef, useState} from "react";

import WaveSurfer from "./wavesurfer.js";
import Regions from "./regions"
import Timeline from "./timeline";
import {Button, Group} from "@vkontakte/vkui";
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28Pause from '@vkontakte/icons/dist/28/pause';

const formWaveSurferOptions = ref => ({
    plugins:[
        Timeline.create({
            container: "#wave-timeline",
        }),
        Regions.create({
            regions: [
                {
                    start: 1,
                    end: 5,
                    loop: false,
                    color: 'hsla(0,0,0,0.0)'
                }
            ],
            dragSelection: {
                slop: 5
            },
            maxRegions:1
        })
    ],
    container: ref,
    waveColor: "#eee",
    progressColor: "#3F8AE0",
    cursorColor: "#FF3347",
    barWidth: 3,
    barRadius: 3,
    barGap: 5,
    responsive: true,
    height: 150,
    normalize: true,
    partialRender: true
});

export default function Waveform({ url: file, wavesurfer:wavesurfer }) {
    const waveformRef = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.loadBlob(file);

        wavesurfer.current.on("ready", function() {
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
        });
        return () => wavesurfer.current.destroy();
    }, [file]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    return (
        <div>
            <div id="wave-timeline" style={{background:'#F2F3F5'}} />
            <div id="waveform" ref={waveformRef} style={{background:'#F2F3F5'}} />
            <Group>
                <Button style={{width:'44px', height:'44px'}} mode={'primary'} onClick={handlePlayPause}>{!playing ? <Icon28Play fill={'#fff'} /> : <Icon28Pause /> }</Button>
            </Group>
        </div>
    );
}
