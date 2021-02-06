import React from 'react'
import {
    Divider,
    Dropdown,
    Form,
    Grid,
    Header,
    Message,
    Placeholder,
    Segment,
} from 'semantic-ui-react'
import axios from 'axios'

const address = 'http://localhost:5000/'

class NewsInput extends React.Component {
    render() {
        const content = this.props.content

        return (
            <div>
                <Form
                    onSubmit={this.props.handleSubmit}
                >
                    <Form.TextArea
                        placeholder='在此输入新闻...'
                        value={content}
                        fluid
                        style={{ height: 200, resize: 'none' }}
                        onChange={this.props.handleChange}
                    />
                    <Form.Button
                        positive
                        fluid
                        size='big'
                        content='提取'
                        loading={this.props.loading}
                    />
                </Form>
            </div>
        )
    }
}

class AbstractOutput extends React.Component {
    render() {
        const content = this.props.content

        if (this.props.loading)
            return (
                <Segment raised>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
            )
        else if (this.props.used)
            return (
                <Segment raised>
                    <Header as='h2'>摘要</Header>
                    <p>{content}</p>
                </Segment>
            )
        else
            return null
    }
}

class Demo extends React.Component {
    state = { input: '', output: '', used: false, loading: false }

    handleChange = (e, { value }) => this.setState({ input: value })

    handleSubmit = () => {
        this.setState({ used: true, loading: true, output: this.state.input })
        axios.get(address + 'api/' + this.state.input)
            .then(res => {
                let { content } = res.data;
                this.setState({ output: content, loading: false })
            })
            .catch(err => { console.log(err) })
    }

    render() {

        return (
            <div>
                <NewsInput
                    content={this.state.input}
                    loading={this.state.loading}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <AbstractOutput
                    content={this.state.output}
                    used={this.state.used}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

const App = () => (
    <Grid container style={{ padding: '5em 0em' }}>
        <Grid.Row>
            <Grid.Column>
                <Header as='h1' dividing>
                    新闻摘要提取
                </Header>
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column>
                <Message>
                    <Header as='h2'>简介</Header>
                    <p>
                        新闻摘要提取因何而发生？可是，即使是这样，新闻摘要提取的出现仍然代表了一定的意义。在这种困难的抉择下，本人思来想去，寝食难安。马云曾经说过，最大的挑战和突破在于用人，而用人最大的突破在于信任人。这似乎解答了我的疑惑。我们都知道，只要有意义，那么就必须慎重考虑。经过上述讨论，而这些并不是完全重要，更加重要的问题是，就我个人来说，新闻摘要提取对我的意义，不能不说非常重大。现在，解决新闻摘要提取的问题，是非常非常重要的。所以，既然如何，现在，解决新闻摘要提取的问题，是非常非常重要的。所以，我认为，了解清楚新闻摘要提取到底是一种怎么样的存在，是解决一切问题的关键。而这些并不是完全重要，更加重要的问题是，本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。经过上述讨论，问题的关键究竟为何？ 苏轼曾经提到过，古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。这不禁令我深思。了解清楚新闻摘要提取到底是一种怎么样的存在，是解决一切问题的关键。
                    </p>
                    <Dropdown
                        icon='github'
                        text='看屎山'
                        button
                        pointing='left'
                        className='black button icon'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item
                                button
                                onClick={() => {
                                    window.open('https://github.com/TardyPurcell/fake-news-abstract-frontend')
                                }}
                            >
                                前端
                            </Dropdown.Item>
                            <Dropdown.Item
                                button
                                onClick={() => {
                                    window.open('https://www.bilibili.com/video/BV1GJ411x7h7?autoplay=1')
                                }}
                            >
                                后端
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Message>
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column>
                <Header as='h1'>演示</Header>
                <Divider />

                <Demo />

            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default App