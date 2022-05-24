import React from "react";
import Header from "../Header";
import { layout } from "../../shared/layout";

interface IProps {
    headerTitle: string;
    children: JSX.Element | JSX.Element[];
}

export default function Page(props: IProps) {
    const { headerTitle, children } = props;
    return <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Header label={headerTitle}/>
        <div style={{ position: "relative", padding: layout.standardComponentPadding }}>{children}</div>
    </div>
}