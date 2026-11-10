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

import com.cl.entity.SheyingleixingEntity;
import com.cl.entity.view.SheyingleixingView;

import com.cl.service.SheyingleixingService;
import com.cl.service.TokenService;

/**
 * 摄影类型
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:40
 */
@RestController
@RequestMapping("/sheyingleixing")
public class SheyingleixingController {
    @Autowired
    private SheyingleixingService sheyingleixingService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,SheyingleixingEntity sheyingleixing,
                                            HttpServletRequest request){
                                    EntityWrapper<SheyingleixingEntity> ew = new EntityWrapper<SheyingleixingEntity>();
                                                        
        
        
        PageUtils page = sheyingleixingService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, sheyingleixing), params), params));
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
    public R list(@RequestParam Map<String, Object> params,SheyingleixingEntity sheyingleixing,
		HttpServletRequest request){
        EntityWrapper<SheyingleixingEntity> ew = new EntityWrapper<SheyingleixingEntity>();

		PageUtils page = sheyingleixingService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, sheyingleixing), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( SheyingleixingEntity sheyingleixing){
       	EntityWrapper<SheyingleixingEntity> ew = new EntityWrapper<SheyingleixingEntity>();
      	ew.allEq(MPUtil.allEQMapPre( sheyingleixing, MPUtil.camelToSnake("sheyingleixing")));
        return R.ok().put("data", sheyingleixingService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(SheyingleixingEntity sheyingleixing){
        EntityWrapper< SheyingleixingEntity> ew = new EntityWrapper< SheyingleixingEntity>();
 		ew.allEq(MPUtil.allEQMapPre( sheyingleixing, MPUtil.camelToSnake("sheyingleixing")));
		SheyingleixingView sheyingleixingView =  sheyingleixingService.selectView(ew);
		return R.ok("查询摄影类型成功").put("data", sheyingleixingView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        SheyingleixingEntity sheyingleixing = sheyingleixingService.selectById(id);
		sheyingleixing = sheyingleixingService.selectView(new EntityWrapper<SheyingleixingEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(sheyingleixing,deSens);
        return R.ok().put("data", sheyingleixing);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        SheyingleixingEntity sheyingleixing = sheyingleixingService.selectById(id);
		sheyingleixing = sheyingleixingService.selectView(new EntityWrapper<SheyingleixingEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(sheyingleixing,deSens);
        return R.ok().put("data", sheyingleixing);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增摄影类型")
    public R save(@RequestBody SheyingleixingEntity sheyingleixing, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(sheyingleixing);
        sheyingleixingService.insert(sheyingleixing);
        return R.ok().put("data",sheyingleixing.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增摄影类型")
    @RequestMapping("/add")
    public R add(@RequestBody SheyingleixingEntity sheyingleixing, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(sheyingleixing);
        sheyingleixingService.insert(sheyingleixing);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改摄影类型")
    public R update(@RequestBody SheyingleixingEntity sheyingleixing, HttpServletRequest request){
        //ValidatorUtils.validateEntity(sheyingleixing);
        sheyingleixingService.updateById(sheyingleixing);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除摄影类型")
    public R delete(@RequestBody Long[] ids){
        sheyingleixingService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	








}
