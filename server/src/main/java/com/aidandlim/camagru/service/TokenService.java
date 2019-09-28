package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import io.jsonwebtoken.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {

    private String secretKey = "JwTsEcReTbYdLiMoF42sIlIcOnVaLlEyInThEuSa";

    public Token createToken(User user) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Date expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + 1000 * 60 * 60);
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        Map<String, Object> headerMap = new HashMap<String, Object>();

        headerMap.put("typ","JWT");
        headerMap.put("alg","HS256");

        Map<String, Object> map= new HashMap<String, Object>();
        map.put("user_id", user.getId());

        JwtBuilder builder = Jwts.builder().setHeader(headerMap)
                .setClaims(map)
                .setExpiration(expireTime)
                .signWith(signatureAlgorithm, signingKey);

        return new Token(builder.compact());
    }

    public boolean checkToken(Token token) {
        try {
            Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token.getToken()).getBody();
            return true;
        } catch (ExpiredJwtException exception) {
            return false;
        } catch (JwtException exception) {
            return false;
        }
    }

    public long getIdFromToken(Token token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token.getToken()).getBody();
            return Long.parseLong(claims.get("user_id").toString());
        } catch (ExpiredJwtException exception) {
            return -1;
        } catch (JwtException exception) {
            return -1;
        }
    }

}
