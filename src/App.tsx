import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"

const AV_LIST = [
  { label: "F1.0", value: 0 },
  { label: "F1.1", value: 1 },
  { label: "F1.3", value: 2 },
  { label: "F1.4", value: 3 },
  { label: "F1.6", value: 4 },
  { label: "F1.8", value: 5 },
  { label: "F2.0", value: 6 },
  { label: "F2.2", value: 7 },
  { label: "F2.5", value: 8 },
  { label: "F2.8", value: 9 },
  { label: "F3.2", value: 10 },
  { label: "F3.6", value: 11 },
  { label: "F4.0", value: 12 },
  { label: "F4.5", value: 13 },
  { label: "F5.0", value: 14 },
  { label: "F5.6", value: 15 },
  { label: "F6.3", value: 16 },
  { label: "F7.1", value: 17 },
  { label: "F8.0", value: 18 },
]

const TV_LIST = [
  { label: "1.0s", value: 0 },
  { label: "0.8s", value: 1 },
  { label: "0.6s", value: 2 },
  { label: "0.5s", value: 3 },
  { label: "0.4s", value: 4 },
  { label: "0.3s", value: 5 },
  { label: "1/4s", value: 6 },
  { label: "1/5s", value: 7 },
  { label: "1/6s", value: 8 },
  { label: "1/8s", value: 9 },
  { label: "1/10s", value: 10 },
  { label: "1/13s", value: 11 },
  { label: "1/15s", value: 12 },
  { label: "1/20s", value: 13 },
  { label: "1/25s", value: 14 },
  { label: "1/30s", value: 15 },
  { label: "1/40s", value: 16 },
  { label: "1/50s", value: 17 },
  { label: "1/60s", value: 18 },
]

const ISO_LIST = [
  { label: "ISO100", value: 0 },
  { label: "ISO125", value: 1 },
  { label: "ISO160", value: 2 },
  { label: "ISO200", value: 3 },
  { label: "ISO250", value: 4 },
  { label: "ISO320", value: 5 },
  { label: "ISO400", value: 6 },
  { label: "ISO500", value: 7 },
  { label: "ISO640", value: 8 },
  { label: "ISO800", value: 9 },
  { label: "ISO1000", value: 10 },
  { label: "ISO1250", value: 11 },
  { label: "ISO1600", value: 12 },
  { label: "ISO2000", value: 13 },
  { label: "ISO2500", value: 14 },
  { label: "ISO3200", value: 15 },
  { label: "ISO4000", value: 16 },
  { label: "ISO5000", value: 17 },
  { label: "ISO6400", value: 18 },
]

const EV_LIST = [
  { label: "-3", value: -9 },
  { label: "-2 2/3", value: -8 },
  { label: "-2 1/3", value: -7 },
  { label: "-2", value: -6 },
  { label: "-1 2/3", value: -5 },
  { label: "-1 1/3", value: -4 },
  { label: "-1", value: -3 },
  { label: "-2/3", value: -2 },
  { label: "-1/3", value: -1 },
  { label: "0", value: 0 },
  { label: "+1/3", value: 1 },
  { label: "+2/3", value: 2 },
  { label: "+1", value: 3 },
  { label: "+1 1/3", value: 4 },
  { label: "+1 2/3", value: 5 },
  { label: "+2", value: 6 },
  { label: "+2 1/3", value: 7 },
  { label: "+2 2/3", value: 8 },
  { label: "+3", value: 9 },
]

/**
 * ラベル名、設定できる値の一覧、の2つを指定すると、設定値を表示するラベルと、設定値を変化させるスライダーを表示するコンポーネント。
 * スタイリングにはReact-BootstrapおよびBootstrap5を使用する。
 */
const SettingSlider = ({ label, values, value, setValue }: {
  label: string,
  values: { label: string, value: number }[],
  value: number,
  setValue: (value: number) => void,
}) => {

  const [index, setIndex] = useState(() => {
    const temp = values.filter(v => v.value === value)
    return temp.length > 0 ? values.indexOf(temp[0]) : 0
  })

  return <Form.Group>
    <Form.Label className="fw-bold">{label}</Form.Label>
    <Form.Range min="0" max={values.length - 1} value={index} onChange={(e) => {
      const i = parseInt(e.target.value)
      setIndex(i)
      setValue(values[i].value)
    }} />
    <div className="d-flex justify-content-between">
      {values.map((v, i) => <div key={i}>{v.label}</div>)}
    </div>
  </Form.Group>

}

const App = () => {

  const [fValue, setFValue] = useState(9)
  const [tValue, setTValue] = useState(18)
  const [isoValue, setIsoValue] = useState(0)
  const [evValue, setEvValue] = useState(0)

  console.group('Debug')
  console.log('F値', fValue)
  console.log('シャッタースピード', tValue)
  console.log('ISO感度', isoValue)
  console.log('EV', (fValue + tValue - isoValue - evValue) / 3)
  console.groupEnd()

  return <Container>
    <Row className="my-3">
      <Col className="text-center">
        <h1>EV換算機</h1>
      </Col>
    </Row>
    <Row className="my-3">
      <Col>
        <SettingSlider label="F値" values={AV_LIST} value={fValue} setValue={setFValue} />
      </Col>
    </Row>
    <Row className="my-3">
      <Col>
        <SettingSlider label="シャッタースピード" values={TV_LIST} value={tValue} setValue={setTValue} />
      </Col>
    </Row>
    <Row className="my-3">
      <Col>
        <SettingSlider label="ISO感度" values={ISO_LIST} value={isoValue} setValue={setIsoValue} />
      </Col>
    </Row>
    <Row className="my-3">
      <Col>
        <SettingSlider label="EV補正値" values={EV_LIST} value={evValue} setValue={setEvValue} />
      </Col>
    </Row>
  </Container>
}

export default App
