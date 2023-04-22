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

  const [fValue, setFValue] = useState(18)

  console.log(fValue)

  return <Container>
    <Row className="my-3">
      <Col className="text-center">
        <h1>EV換算機</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <SettingSlider label="F値" values={AV_LIST} value={fValue} setValue={setFValue} />
      </Col>
    </Row>
  </Container>
}

export default App
