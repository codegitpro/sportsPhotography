package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.*;
import java.lang.*;
import java.math.*;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;
import com.cl.annotation.SysLog;

import com.cl.entity.DiscusszhoubianshangchengEntity;
import com.cl.entity.view.DiscusszhoubianshangchengView;

import com.cl.service.DiscusszhoubianshangchengService;
import com.cl.service.TokenService;

/**
 * 周边商城评论表
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
@RestController
@RequestMapping("/discusszhoubianshangcheng")
public class DiscusszhoubianshangchengController {
    @Autowired
    private DiscusszhoubianshangchengService discusszhoubianshangchengService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,DiscusszhoubianshangchengEntity discusszhoubianshangcheng,
                                                                                                                                                                                        HttpServletRequest request){
                                    EntityWrapper<DiscusszhoubianshangchengEntity> ew = new EntityWrapper<DiscusszhoubianshangchengEntity>();
                                                                                                                                                                                                                                                                                            
        
        
        PageUtils page = discusszhoubianshangchengService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, discusszhoubianshangcheng), params), params));
        Map<String, String> deSens = new HashMap<>();
                                                                                                                                                                                                                                            //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }







    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,DiscusszhoubianshangchengEntity discusszhoubianshangcheng,
		HttpServletRequest request){
        EntityWrapper<DiscusszhoubianshangchengEntity> ew = new EntityWrapper<DiscusszhoubianshangchengEntity>();

		PageUtils page = discusszhoubianshangchengService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, discusszhoubianshangcheng), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( DiscusszhoubianshangchengEntity discusszhoubianshangcheng){
       	EntityWrapper<DiscusszhoubianshangchengEntity> ew = new EntityWrapper<DiscusszhoubianshangchengEntity>();
      	ew.allEq(MPUtil.allEQMapPre( discusszhoubianshangcheng, MPUtil.camelToSnake("discusszhoubianshangcheng")));
        return R.ok().put("data", discusszhoubianshangchengService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(DiscusszhoubianshangchengEntity discusszhoubianshangcheng){
        EntityWrapper< DiscusszhoubianshangchengEntity> ew = new EntityWrapper< DiscusszhoubianshangchengEntity>();
 		ew.allEq(MPUtil.allEQMapPre( discusszhoubianshangcheng, MPUtil.camelToSnake("discusszhoubianshangcheng")));
		DiscusszhoubianshangchengView discusszhoubianshangchengView =  discusszhoubianshangchengService.selectView(ew);
		return R.ok("查询周边商城评论表成功").put("data", discusszhoubianshangchengView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        DiscusszhoubianshangchengEntity discusszhoubianshangcheng = discusszhoubianshangchengService.selectById(id);
		discusszhoubianshangcheng = discusszhoubianshangchengService.selectView(new EntityWrapper<DiscusszhoubianshangchengEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(discusszhoubianshangcheng,deSens);
        return R.ok().put("data", discusszhoubianshangcheng);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        DiscusszhoubianshangchengEntity discusszhoubianshangcheng = discusszhoubianshangchengService.selectById(id);
		discusszhoubianshangcheng = discusszhoubianshangchengService.selectView(new EntityWrapper<DiscusszhoubianshangchengEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(discusszhoubianshangcheng,deSens);
        return R.ok().put("data", discusszhoubianshangcheng);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增周边商城评论表")
    public R save(@RequestBody DiscusszhoubianshangchengEntity discusszhoubianshangcheng, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(discusszhoubianshangcheng);
        discusszhoubianshangchengService.insert(discusszhoubianshangcheng);
        return R.ok().put("data",discusszhoubianshangcheng.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增周边商城评论表")
    @RequestMapping("/add")
    public R add(@RequestBody DiscusszhoubianshangchengEntity discusszhoubianshangcheng, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(discusszhoubianshangcheng);
        discusszhoubianshangchengService.insert(discusszhoubianshangcheng);
        return R.ok();
    }
     /**
     * 获取用户密保
     */
    @RequestMapping("/security")
    @IgnoreAuth
    public R security(@RequestParam String username){
        DiscusszhoubianshangchengEntity discusszhoubianshangcheng = discusszhoubianshangchengService.selectOne(new EntityWrapper<DiscusszhoubianshangchengEntity>().eq("", username));
        return R.ok().put("data", discusszhoubianshangcheng);
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @IgnoreAuth
    public R update(@RequestBody DiscusszhoubianshangchengEntity discusszhoubianshangcheng, HttpServletRequest request){
        //ValidatorUtils.validateEntity(discusszhoubianshangcheng);
        discusszhoubianshangchengService.updateById(discusszhoubianshangcheng);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除周边商城评论表")
    public R delete(@RequestBody Long[] ids){
        discusszhoubianshangchengService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	
	/**
     * 前端智能排序
     */
	@IgnoreAuth
    @RequestMapping("/autoSort")
    public R autoSort(@RequestParam Map<String, Object> params,DiscusszhoubianshangchengEntity discusszhoubianshangcheng, HttpServletRequest request,String pre){
        EntityWrapper<DiscusszhoubianshangchengEntity> ew = new EntityWrapper<DiscusszhoubianshangchengEntity>();
        Map<String, Object> newMap = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
		Iterator<Map.Entry<String, Object>> it = param.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry<String, Object> entry = it.next();
			String key = entry.getKey();
			String newKey = entry.getKey();
			if (pre.endsWith(".")) {
				newMap.put(pre + newKey, entry.getValue());
			} else if (StringUtils.isEmpty(pre)) {
				newMap.put(newKey, entry.getValue());
			} else {
				newMap.put(pre + "." + newKey, entry.getValue());
			}
		}
		params.put("sort", "clicktime");
        params.put("order", "desc");
		PageUtils page = discusszhoubianshangchengService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, discusszhoubianshangcheng), params), params));
        return R.ok().put("data", page);
    }








}
