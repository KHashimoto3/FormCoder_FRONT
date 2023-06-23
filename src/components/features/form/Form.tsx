import { Container, Typography } from "@mui/material";

type Props = {
    changeFormDataIndex: (index: number) => void;
};

export const Form = (props: Props) => {

    //MainPageから渡された、ヒントのリストのインデックスを変更する関数
    const changeFormDataIndex = props.changeFormDataIndex;

    const tentativeCodeData: string[] = [
        "#include <stdio.h>",
        "int nums[5];\nint i;",
        "i = 0", "i < 5", "",
        "",
    ]

    const commentStyle = {
        color: "#39b359",
        fontSize: "16pt",
        margin: "0"
    }

    const preStyle = {
        fontSize: "16pt",
    }

    const inputStyle = {
        fontSize: "16pt"
    }

    const textAreaStyle = {
        fontSize: "16pt"
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4">フォーム</Typography>

            <pre style={preStyle}>
                <pre style={commentStyle}>/**</pre>
                <textarea style={commentStyle} cols={40} rows={2} onFocus={() => changeFormDataIndex(0)} ></textarea><br />
                <pre style={commentStyle}>**/</pre>
                <textarea style={textAreaStyle} cols={40} rows={2} onFocus={() => changeFormDataIndex(1)} >{tentativeCodeData[0]}</textarea><br />
                int main(void){'{\n'}
                {'\t'}<textarea style={textAreaStyle} cols={40} rows={2} onFocus={() => changeFormDataIndex(2)} >{tentativeCodeData[1]}</textarea><br />
                <pre style={commentStyle}>{'\t'}//入力値を受け取る</pre>
                {'\t'}for {'('}<input style={inputStyle} type="text" size={5} value={tentativeCodeData[2]} onFocus={() => changeFormDataIndex(3)} />{'; '}<input style={inputStyle} type="text" size={5} value={tentativeCodeData[3]} onFocus={() => changeFormDataIndex(3)} />{'; '}<input style={inputStyle} type="text" size={5} value={tentativeCodeData[4]} onFocus={() => changeFormDataIndex(3)} />{') {\n'}
                {'\t'}{'\t'}<textarea style={textAreaStyle} cols={40} rows={2} onFocus={() => changeFormDataIndex(4)} >{tentativeCodeData[5]}</textarea><br />
                {'\t'}{'}'}<br />
                <pre style={commentStyle}>{'\t'}//それぞれの値を調べて、結果を出力する</pre>
                {'\t'}for {'('}<input style={inputStyle} type="text" size={5} onFocus={() => changeFormDataIndex(3)} />{'; '}<input style={inputStyle} type="text" size={5} onFocus={() => changeFormDataIndex(3)} />{'; '}<input style={inputStyle} type="text" size={5} onFocus={() => changeFormDataIndex(3)} />{') {\n'}
                {'\t'}{'\t'}<textarea style={textAreaStyle} cols={40} rows={2} onFocus={() => changeFormDataIndex(4)} ></textarea><br />
                {'\t'}{'}'}<br />
                {'\t'}return 0;<br />
                {'}'}
            </pre>
        </Container>
    )
};