import React, { Component } from "react";
import styled from 'styled-components';
import firebase from "../../config/fbConfig";
import { device } from "../../media queries/deviceName";

const AffidavitContent = styled.div`
    overflow: scroll;
    margin-top: 50px;
    .overContainer {
        width: 900px;
        height: 1200px;
        background-color: #fff;
        margin: 20px;
        line-height: 1.7;
        font-size: 16px;
        padding: 30px 20px;
        -webkit-box-shadow: 2px 6px 19px -4px rgba(0,0,0,0.14);
        -moz-box-shadow: 2px 6px 19px -4px rgba(0,0,0,0.14);
        box-shadow: 2px 6px 19px -4px rgba(0,0,0,0.14);
        @media ${device.mobileL} {
            font-size: 14px;
        }
        .title {
            margin-bottom: 10px;
            h3 {
                font-size: 18px;
                font-weight: bold;
                @media ${device.mobileL} {
                    font-size: 16px;
                }
            }
        }
        ul {
            margin: 10px 0 25px 0;
            li {
                display: flex;
                .item_no {
                    min-width: 30px;
                }
            }
        }
        section {
            display: flex;
            .signature_field_1 {
                width: 30%;
            }
            .signature_field_2 {
                width: 70%;
            }
        }
    }
`;

const ProjectInformation = styled.div`
    border: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0 15px 0;
    p {
        border: 1px solid #000;
        padding: 8px;
    }
    .table1 {
        width: 10%;
        text-align: center;
    }
    .table_a {
        width: 25%;
    }
    .table_b {
        width: 55%;
    }
`;

class Affidavit_pdf extends Component {
    state = {
        affidavitData: ''
    }
    componentDidMount() {
        this.GetAffidavitInformation(this.props.project.affidavitID);
    }
    GetAffidavitInformation = (affidavitID) => {
        const db = firebase.firestore();
        db.collection('affidavit').doc(affidavitID).get()
            .then(q => {
                this.setState({ affidavitData: q.data() })
            })
            .catch(err => console.log("errorrrrrr", err))
    }
    render() {
        const { project } = this.props;
        console.log('this.props.project', this.props.project)
        const {
            adopterAddress,
            adopterCensusAddress,
            adopterEmail,
            adopterID,
            adopterIDcard,
            adopterPhone,
            adopterSignature,
            affidavitNumber,
            closeCaseAt,
            createdAt,
            remark,
            fosterAddress,
            fosterEmail,
            fosterID,
            fosterPhone,
            fosterSignature,
            projectID } = this.state.affidavitData
        //時間
        let cr_year;
        let cr_m;
        let cr_month;
        let cr_date;
        let cl_year;
        let cl_m;
        let cl_month;
        let cl_date;
        if (this.state.affidavitData !== '') {
            const createdTime = createdAt.toDate().toString().split(" ")
            const closeTime = closeCaseAt.toDate().toString().split(" ")
            cr_year = parseInt(createdTime[3]) - 1911;
            cr_m = createdTime[1];
            cr_month = cr_m === "Jan" ? 1 : (cr_m === "Feb" ? 2 : (cr_m === "cr_Mar" ? 3 : (cr_m === "Apr" ? 4 : (cr_m === "cr_May" ? 5 : (cr_m === "Jun" ? 6 : (cr_m === "Jul" ? 7 : (cr_m === "Aug" ? 8 : (cr_m === "Sep" ? 9 : (cr_m === "Oct" ? 10 : (cr_m === "Nov" ? 11 : 12))))))))));
            cr_date = createdTime[2];
            cl_year = parseInt(closeTime[3]) - 1911;
            cl_m = closeTime[1];
            cl_month = cl_m === "Jan" ? 1 : (cl_m === "Feb" ? 2 : (cl_m === "cl_Mar" ? 3 : (cl_m === "Apr" ? 4 : (cl_m === "cl_May" ? 5 : (cl_m === "Jun" ? 6 : (cl_m === "Jul" ? 7 : (cl_m === "Aug" ? 8 : (cl_m === "Sep" ? 9 : (cl_m === "Oct" ? 10 : (cl_m === "Nov" ? 11 : 12))))))))));
            cl_date = closeTime[2];
        }
        return (
            <AffidavitContent>
                <div className='overContainer'>
                    <div className='title'>
                        <h3>愛心認養切結書</h3>
                        <div>認養編號：{affidavitNumber}</div>
                    </div>
                    <p>茲向 {project.authorLastName}{project.authorFirstName} 認養動物乙隻，詳細資料如下：</p>
                    <ProjectInformation>
                        <p className="card-nickName table1">動物名</p><p className="table_a">{project.nickName}</p>
                        <p className="card-species table1">品種</p><p className="table_b">{project.species}／{project.variety}</p>
                        <p className="card-gender table1">性別</p><p className="table_a">{project.gender}</p>
                        <p className="card-coatColor table1">毛色</p><p className="table_b">{project.coatColor}</p>
                        <p className="card-size table1">體型</p><p className="table_a">{project.size}</p>
                        <p className="card-feature table1">特徵</p><p className="table_b">{project.feature}</p>
                        <p className="card-age table1">年齡</p><p className="table_a">{project.age}</p>
                        <p className="card-affidavitRemarks table1">備註</p><p className="table_b">{remark}</p>
                    </ProjectInformation>
                    <p>本人願遵守以下約定：</p>
                    <ul>
                        <li><div className='item_no'>1. </div><div>認養人需年滿20歲，未滿20歲者需經法定代理人同意並出示同意書。</div></li>
                        <li><div className='item_no'>2. </div><div>依法辦理犬隻寵物登記、晶片植入及絕育等事項（貓咪無強制需入晶片，但需於母貓6個月公貓8個月大時施予結紮手術）。</div></li>
                        <li><div className='item_no'>3. </div><div>無論何時都以人道方式對待認養之動物，並提供認養動物適當之食物、乾淨之飲水、適當之運動空間、不可長期將動物關在籠中或栓綁在狹小之空間飼養，否則視為虐待動物。</div></li>
                        <li><div className='item_no'>4. </div><div>定期幫牠進行預防注射、狂犬病疫苗、驅蟲及健康檢查。</div></li>
                        <li><div className='item_no'>5. </div><div>當牠受傷或罹病時，必請獸醫師給予醫療。</div></li>
                        <li><div className='item_no'>6. </div><div>妥善照管牠，防止其無故侵害他人之生命、身體、自由、財產或安寧。</div></li>
                        <li><div className='item_no'>7. </div><div>不隨便放縱牠於戶外，出入公共場所或公眾得出入之場所時必由14歲以上之人伴同，並採取適當之防衛措施，如繫鍊、提籃等，始得攜出戶外。</div></li>
                        <li><div className='item_no'>8. </div><div>若因任何原因無法續養，本人需立即通知送養人知悉，並與送養人共同為牠找到新的認養家庭，絕不棄養認養的動物。</div></li>
                        <li><div className='item_no'>9. </div><div>當牠轉讓、遺失或死亡時，本人需立即通知送養人知悉，並依法辦理。</div></li>
                        <li><div className='item_no'>10. </div><div>認養之動物於二星期內確認是否適合飼養，如有任何請在此期限內與送養人聯絡處理。本人亦願意接受送養人日後之追蹤訪視及飼養輔導。</div></li>
                        <li><div className='item_no'>11. </div><div>本人遵守動物保護法及有關單位對家畜衛生管理之相關規定。</div></li>
                        <li><div className='item_no'>12. </div><div>認養人如有違反以上認養規定者，送養人有權收回該動物，如有訴訟問題時可以此切結書以適當的法律途徑解決,。</div></li>
                        <li><div className='item_no'>13. </div><div>本愛心認養切結書一式二份，分別執於認養人及送養人處。</div></li>
                    </ul>
                    <hr />
                    <section>
                        <div className='signature_field_1'>
                            <div>認養人（簽名）：{adopterSignature}</div>
                            <div>身分證字號：{adopterIDcard}</div>
                            <div>聯絡電話：{adopterPhone}</div>
                        </div>
                        <div className='signature_field_2'>
                            <div>E-Mail：{adopterEmail}</div>
                            <div>居住地：{adopterAddress}</div>
                            <div>戶籍地：{adopterCensusAddress}</div>
                        </div>
                    </section>
                    <br />
                    <div>認養人簽署日期 中 華 民 國 {cl_year} 年 {cl_month} 月 {cl_date} 日</div>
                    <hr />
                    <section>
                        <div className='signature_field_1'>
                            <div>送養人（簽名）：{fosterSignature}</div>
                            <div>聯絡電話：{fosterPhone}</div>
                        </div>
                        <div className='signature_field_2'>
                            <div>E-Mail：{fosterEmail}</div>
                            <div>居住地：{fosterAddress}</div>
                        </div>
                    </section>
                    <br />
                    <div>請自認養人簽署日起算七日內結案，若逾期此份切結書視同失效</div>
                    <div>送養人簽署日期 中 華 民 國 {cr_year} 年 {cr_month} 月 {cr_date} 日</div>
                </div>
            </AffidavitContent>
        )
    }
}


export default Affidavit_pdf;