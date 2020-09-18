import React from "react";
import {
    Button,
    Checkbox,
    Div,
    File,
    FormLayout,
    Group,
    InfoRow,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    RichCell,
    Separator,
    SimpleCell,
    Textarea
} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import {handleSetActivePanel, handleToPreviousPanel} from "../../core/HistoryDispatcher";
import {useDispatch, useSelector} from "react-redux";
import Icon24Gallery from '@vkontakte/icons/dist/24/gallery';
import {setPodcastContent, setPodcastForm, setPodcastIcon} from "../../state/reducers/vk/actions";
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import Icon24DismissOverlay from "@vkontakte/icons/dist/24/dismiss_overlay";
import Icon36PodcastsOutline from '@vkontakte/icons/dist/36/podcasts_outline';
import {PODCAST_EDITOR_PANEL} from "../../constants/PanelConstants";


const NewPodcast = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const image = useSelector(state =>state.vk.image);
    const music = useSelector(state =>state.vk.music);
    const form = useSelector(state =>state.vk.form);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => handleToPreviousPanel(dispatch)} />}>Новый подкаст</PanelHeader>
            <Div
                style={{
                    display:'flex',
                    alignItems:'stretch'
                }}
            >
                {
                    !!image ?
                        <div
                            style={{
                                backgroundImage: `url(${image})`,
                                width:'72px',
                                height:'72px',
                                backgroundPosition: 'center center',
                                backgroundSize: '72px 72px',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: "10px",
                                alignSelf:'center',
                                display: 'flex',
                                flexFlow: 'row wrap',
                            }}
                        >
                            <Icon24DismissOverlay style={{order: 999,marginLeft:'auto'}} onClick={()=>dispatch(setPodcastIcon(''))} />
                        </div> : <File accept="image/*" controlSize="m" mode={'outline'}
                                       style={{border: "0.5px solid rgba(0, 0, 0, 0.12", borderRadius: "10px",
                                           height:'72px', width:'72px', display:'flex', alignItems:'center', justifyContent:'center', alignSelf:'center'}}
                                       getRootRef={(ref)=>{
                                           if (ref) {
                                               // for(var i in ref)
                                               //     console.log('ref[' + i + '] = ' + ref[i]);
                                               ref.onchange = e =>{
                                                   e.preventDefault();
                                                   const { files } = e.target;
                                                   if (files.length){
                                                       const fileReader = new FileReader();
                                                       fileReader.onload = () =>dispatch(setPodcastIcon(fileReader.result));
                                                       fileReader.readAsDataURL(files[0]);
                                                   }
                                               }
                                           }
                                       }} >
                            <Icon24Gallery />
                        </File>
                }
                <FormLayout style={{width:'100%'}}>
                    <Input type="text" top={'Название'} />
                </FormLayout>
            </Div>
            <FormLayout>
                <Textarea top={'Описание подкаста'} />
            </FormLayout>
            {
                !!music ?
                    <Group>
                        <SimpleCell before={
                            <Div>
                                <div
                                    style={{
                                        backgroundColor: `#F2F3F5`,
                                        width:'48px',
                                        height:'48px',
                                        borderRadius: "10px",
                                        display: 'flex',alignItems:'center', justifyContent:'center'
                                    }}
                                ><Icon36PodcastsOutline style={{alignSelf:'center', color:'#99A2AD'}} /></div>
                            </Div>
                        } after={form.duration}>{form.title}</SimpleCell>
                        <Div><InfoRow header={<label>Вы можете добавить таймкоды и скорректировать<br/>подкаст в режиме редактирования</label>}/></Div>
                        <Div><Button mode={'outline'} size="xl" onClick={()=>handleSetActivePanel(dispatch, PODCAST_EDITOR_PANEL)}>Редактировать аудиозапись</Button></Div>
                    </Group> : <Placeholder
                        header={'Загрузите Ваш подкаст'}
                        action={<File accept="audio/*" mode={'outline'} size="l"
                                      getRootRef={(ref)=>{
                                          if (ref) {
                                              ref.onchange = e =>{
                                                  e.preventDefault();
                                                  const { files } = e.target;
                                                  if (files.length){
                                                      const fileReader = new FileReader();

                                                      fileReader.onload = () =>{
                                                          const aud = new Audio(fileReader.result);

                                                          aud.onloadedmetadata = () =>{
                                                              const hours = Math.floor(aud.duration / 60 / 60);
                                                              const minutes = Math.floor(aud.duration / 60) - (hours * 60);
                                                              const seconds = Math.floor(aud.duration % 60);

                                                              dispatch(setPodcastForm({
                                                                  duration:[
                                                                      hours.toString().padStart(2, '0'),
                                                                      minutes.toString().padStart(2, '0'),
                                                                      seconds.toString().padStart(2, '0')
                                                                  ].join(':'), title:files[0].name, link:files[0]}));
                                                              dispatch(setPodcastContent(fileReader.result))
                                                          };
                                                      };
                                                      fileReader.readAsDataURL(files[0]);
                                                  }
                                              }
                                          }
                                      }}
                        >Загрузить файл</File>}
                    >
                        Выберите готовый аудиофайл из вашего телефона и добавьте его
                    </Placeholder>
            }
            <Separator/>
            <Group separator={'hide'}>
                <Checkbox>Ненормативный контент</Checkbox>
                <Checkbox>Искючить эпизод из экспорта</Checkbox>
                <Checkbox>Трейлер подкаста</Checkbox>
            </Group>
            <RichCell
                disabled
                after={<Icon16Chevron />}
                caption="Всем пользователям"
                bottom={<InfoRow header={<label>При публикации записи с эпизодом, он<br/>становится доступным для всех пользователей</label>}/>}
            >Кому доступен данный подкаст</RichCell>
            <Div><Button size="xl">Далее</Button></Div>
        </Panel>
    );
};

NewPodcast.propTypes = {
    id: PropTypes.string.isRequired,
};

export default NewPodcast;
