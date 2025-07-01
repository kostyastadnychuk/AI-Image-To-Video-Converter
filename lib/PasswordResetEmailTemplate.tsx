import React from 'react';

interface PasswordResetEmailTemplateProps {
  resetLink: string;
  username: string;
}

export function PasswordResetEmailTemplate({ resetLink, username } : PasswordResetEmailTemplateProps)
{
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#0044cc' }}>비밀번호 변경 요청</h1>
      <p>안녕하세요, {username}님,</p>
      <p>비밀번호 변경 요청을 받았습니다. 아래 링크를 클릭하여 비밀번호를 변경하세요:</p>
      <p>
      <a href={resetLink} style={{ color: '#0044cc', textDecoration: 'none', fontSize: '40px' }}>
        비밀번호 변경
      </a>
      </p>
      <p>링크는 24시간 동안 유효합니다. 만약 본인이 요청하지 않았다면 이 이메일을 무시해 주세요.</p>
      <p>감사합니다,<br />manningcompany 팀</p>
    </div>
  );
};

